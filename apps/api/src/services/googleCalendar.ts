import { google } from 'googleapis';
import { prisma } from '@repo/db';
import { decryptToken, encryptToken } from './tokenCrypto.js';

const scopes = [
  'https://www.googleapis.com/auth/calendar.freebusy',
  'https://www.googleapis.com/auth/calendar.events',
  'openid',
  'email',
  'profile',
];

function getRedirectUri() {
  return process.env.GOOGLE_CALENDAR_REDIRECT_URI || `${process.env.API_URL || 'http://localhost:8000'}/api/v1/integrations/google/callback`;
}

function getOAuthClient() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are required');
  }

  return new google.auth.OAuth2(clientId, clientSecret, getRedirectUri());
}

type BusyRange = {
  start: string;
  end: string;
};

type CreateCalendarEventInput = {
  userId: string;
  title: string;
  description?: string;
  guestEmail: string;
  guestName?: string;
  attendees?: Array<{
    email: string;
    displayName?: string;
  }>;
  startTime: Date;
  endTime: Date;
  timeZone?: string;
};

export class GoogleCalendarService {
  getAuthorizationUrl(userId: string) {
    const client = getOAuthClient();
    const redirectUri = getRedirectUri();
    console.info('[GoogleCalendarService.getAuthorizationUrl] Starting Google OAuth', {
      userId,
      redirectUri,
      scopes,
    });

    return client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: scopes,
      state: userId,
    });
  }

  async handleCallback(userId: string, code: string) {
    const client = getOAuthClient();
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    let email: string | null = null;
    let providerAccountId: string | null = null;

    try {
      const oauth2 = google.oauth2({ version: 'v2', auth: client });
      const profile = await oauth2.userinfo.get();
      email = profile.data.email ?? null;
      providerAccountId = profile.data.id ?? null;
    } catch (error) {
      console.error('[GoogleCalendarService.handleCallback] Failed to load Google profile:', error);
    }

    const tokenData: Record<string, unknown> = {
      providerAccountId,
      email,
      accessToken: encryptToken(tokens.access_token),
      tokenType: tokens.token_type,
      scope: tokens.scope,
      expiryDate: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
      syncEnabled: true,
    };

    if (tokens.refresh_token) {
      tokenData.refreshToken = encryptToken(tokens.refresh_token);
    }

    return (prisma as any).calendarConnection.upsert({
      where: {
        userId_provider: {
          userId,
          provider: 'google',
        },
      },
      update: tokenData,
      create: {
        userId,
        provider: 'google',
        providerAccountId,
        email,
        accessToken: encryptToken(tokens.access_token),
        refreshToken: encryptToken(tokens.refresh_token),
        tokenType: tokens.token_type,
        scope: tokens.scope,
        expiryDate: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
        calendarId: 'primary',
        syncEnabled: true,
      },
    });
  }

  async getConnection(userId: string) {
    return (prisma as any).calendarConnection.findUnique({
      where: {
        userId_provider: {
          userId,
          provider: 'google',
        },
      },
      select: {
        id: true,
        provider: true,
        email: true,
        calendarId: true,
        syncEnabled: true,
        scope: true,
        expiryDate: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async disconnect(userId: string) {
    await (prisma as any).calendarConnection.deleteMany({
      where: {
        userId,
        provider: 'google',
      },
    });
  }

  async getBusyRanges(userId: string, timeMin: Date, timeMax: Date): Promise<BusyRange[]> {
    const connection = await this.getStoredConnection(userId);
    if (!connection?.syncEnabled) return [];
    if (!connection.refreshToken && !connection.accessToken) {
      console.warn('[GoogleCalendarService.getBusyRanges] Google connection has no usable tokens', {
        userId,
        connectionId: connection.id,
      });
      return [];
    }

    const client = await this.getAuthorizedClient(connection);
    const calendar = google.calendar({ version: 'v3', auth: client });
    const result = await calendar.freebusy.query({
      requestBody: {
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        items: [{ id: connection.calendarId || 'primary' }],
      },
    });

    const calendarId = connection.calendarId || 'primary';
    return result.data.calendars?.[calendarId]?.busy?.flatMap((range) => {
      if (!range.start || !range.end) return [];
      return [{ start: range.start, end: range.end }];
    }) ?? [];
  }

  async createEvent(input: CreateCalendarEventInput) {
    const connection = await this.getStoredConnection(input.userId);
    if (!connection?.syncEnabled) {
      console.info('[GoogleCalendarService.createEvent] No active Google Calendar connection for user', {
        userId: input.userId,
      });
      return null;
    }

    if (!connection.refreshToken && !connection.accessToken) {
      console.warn('[GoogleCalendarService.createEvent] Google connection has no usable tokens', {
        userId: input.userId,
        connectionId: connection.id,
      });
      return null;
    }

    const client = await this.getAuthorizedClient(connection);
    const calendar = google.calendar({ version: 'v3', auth: client });
    const requestBody: Record<string, unknown> = {
      summary: input.title,
      description: input.description,
      start: {
        dateTime: input.startTime.toISOString(),
        timeZone: input.timeZone,
      },
      end: {
        dateTime: input.endTime.toISOString(),
        timeZone: input.timeZone,
      },
      attendees: input.attendees?.length
        ? input.attendees
        : [
            {
              email: input.guestEmail,
              displayName: input.guestName,
            },
          ],
    };

    if (!input.description) {
      delete requestBody.description;
    }

    const result = await (calendar.events.insert as any)({
      calendarId: connection.calendarId || 'primary',
      sendUpdates: 'all',
      requestBody,
    });

    const eventId = result.data.id ?? null;
    console.info('[GoogleCalendarService.createEvent] Google Calendar event created', {
      userId: input.userId,
      eventId,
      calendarId: connection.calendarId || 'primary',
    });

    return eventId;
  }

  private async getStoredConnection(userId: string) {
    return (prisma as any).calendarConnection.findUnique({
      where: {
        userId_provider: {
          userId,
          provider: 'google',
        },
      },
    });
  }

  private async getAuthorizedClient(connection: any) {
    const client = getOAuthClient();
    const credentials: Record<string, string | number | null> = {
      access_token: decryptToken(connection.accessToken),
      refresh_token: decryptToken(connection.refreshToken),
      token_type: connection.tokenType,
      scope: connection.scope,
    };

    if (connection.expiryDate) {
      credentials.expiry_date = new Date(connection.expiryDate).getTime();
    }

    client.setCredentials(credentials);

    client.on('tokens', async (tokens) => {
      await (prisma as any).calendarConnection.update({
        where: {
          id: connection.id,
        },
        data: {
          accessToken: tokens.access_token ? encryptToken(tokens.access_token) : connection.accessToken,
          refreshToken: tokens.refresh_token ? encryptToken(tokens.refresh_token) : connection.refreshToken,
          expiryDate: tokens.expiry_date ? new Date(tokens.expiry_date) : connection.expiryDate,
          tokenType: tokens.token_type ?? connection.tokenType,
          scope: tokens.scope ?? connection.scope,
        },
      });
    });

    return client;
  }
}

export const googleCalendarService = new GoogleCalendarService();
