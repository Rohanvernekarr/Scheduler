import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middleware/auth.js';
import { googleCalendarService } from '../services/googleCalendar.js';

const webUrl = process.env.WEB_URL || 'https://dashboard.schedulers.app';

export class IntegrationController {
  async list(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.userId;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const googleConnection = await googleCalendarService.getConnection(userId);
      res.json({
        data: {
          google: googleConnection
            ? {
                connected: true,
                email: googleConnection.email,
                syncEnabled: googleConnection.syncEnabled,
                calendarId: googleConnection.calendarId,
              updatedAt: googleConnection.updatedAt,
              hasRequiredScopes:
                typeof googleConnection.scope === 'string' &&
                googleConnection.scope.includes('https://www.googleapis.com/auth/calendar.freebusy') &&
                googleConnection.scope.includes('https://www.googleapis.com/auth/calendar.events'),
              }
            : {
                connected: false,
              },
        },
      });
    } catch (error) {
      console.error('[IntegrationController.list]', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async connectGoogle(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.userId;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      res.json({ data: { url: googleCalendarService.getAuthorizationUrl(userId) } });
    } catch (error) {
      console.error('[IntegrationController.connectGoogle]', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async googleCallback(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const code = typeof req.query.code === 'string' ? req.query.code : null;
      const userId = typeof req.query.state === 'string' ? req.query.state : req.userId;

      if (!code || !userId) {
        res.redirect(`${webUrl}/settings?tab=integrations&google=error`);
        return;
      }

      const connection = await googleCalendarService.handleCallback(userId, code);
      console.info('[IntegrationController.googleCallback] Google Calendar connected', {
        userId,
        connectionId: connection.id,
        email: connection.email,
        hasRefreshToken: Boolean(connection.refreshToken),
      });
      res.redirect(`${webUrl}/settings?tab=integrations&google=connected`);
    } catch (error) {
      console.error('[IntegrationController.googleCallback]', error);
      res.redirect(`${webUrl}/settings?tab=integrations&google=error`);
    }
  }

  async disconnectGoogle(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.userId;
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      await googleCalendarService.disconnect(userId);
      res.json({ message: 'Google Calendar disconnected' });
    } catch (error) {
      console.error('[IntegrationController.disconnectGoogle]', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export const integrationController = new IntegrationController();
