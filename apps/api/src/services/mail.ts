import { prisma } from '@repo/db';
import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
  console.error('[MailService] Error: RESEND_API_KEY is not defined in environment variables.');
}

const resend = new Resend(RESEND_API_KEY || 'MISSING_KEY');
const FROM_EMAIL = 'Scheduler <notifications@rohanrv.tech>';

export class MailService {
  /**
   * Sends an email using Resend and logs the result.
   */
  async sendEmail(to: string, subject: string, body: string) {
    console.log(`[MailService] Sending email to ${to} via Resend...`);

    try {
      const { data, error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: to,
        subject: subject,
        html: body.replace(/\n/g, '<br>'), // Simple text to HTML conversion
      });

      if (error) {
        throw error;
      }

      await prisma.emailLog.create({
        data: {
          recipient: to,
          subject: subject,
          status: 'SENT',
        },
      });

      return { success: true, id: data?.id };
    } catch (error: any) {
      console.error('[MailService] Resend Error:', error);

      await prisma.emailLog.create({
        data: {
          recipient: to,
          subject: subject,
          status: 'FAILED',
          error: error.message,
        },
      });

      return { success: false, error };
    }
  }

  async sendMeetingInvitation(participantEmail: string, meeting: any) {
    const subject = `Invitation: ${meeting.title}`;
    const userTimeZone = meeting.timeZone || 'UTC';

    const date = new Date(meeting.startTime);
    // Formatting based on provided timezone
    const dateStr = date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: userTimeZone
    });
    const timeStr = date.toLocaleTimeString('en-GB', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: userTimeZone
    }).toLowerCase();
    const body = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:20px;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1a1a1a;">
  <div style="max-width:400px;border:1px solid #e5e7eb;border-radius:12px;padding:24px;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
    <h1 style="margin:0 0 4px 0;font-size:18px;font-weight:700;color:#111827;">${meeting.title}</h1>
    <p style="margin:0 0 20px 0;font-size:14px;color:#6b7280;">${dateStr} // ${timeStr}</p>
    
    <div style="margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid #f3f4f6;">
      <p style="margin:0 0 4px 0;font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;">Organized by</p>
      <p style="margin:0;font-size:14px;font-weight:500;color:#111827;">${meeting.host?.name || 'Rohan Vernekar'}</p>
    </div>

    ${meeting.meetingLink ? `
    <a href="${meeting.meetingLink}" style="display:block;background:#000000;color:#ffffff;text-align:center;padding:12px;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none;margin-bottom:16px;">
      Join Meeting
    </a>

    <div style="font-size:12px;color:#6b7280;line-height:1.5;">
      <p style="margin:0 0 4px 0;font-weight:600;color:#374151;">Link:</p>
      <p style="margin:0;word-break:break-all;">${meeting.meetingLink}</p>
    </div>
    ` : `
    <p style="font-size:12px;color:#6b7280;font-style:italic;">No meeting link provided.</p>
    `}

    <div style="margin-top:24px;padding-top:16px;border-top:1px solid #f3f4f6;">
      <p style="margin:0;font-size:11px;color:#9ca3af;">Sent via Scheduler</p>
    </div>
  </div>
</body>
</html>
`;

    return this.sendEmail(participantEmail, subject, body);
  }


  async sendTargetedInvite(data: {
    hostName: string;
    guestEmail: string;
    inviteLink: string;
    slots: any[]; // Keep in data but don't show all in mail
  }) {
    const subject = `Priority Invitation: Book your session with ${data.hostName}`;

    const body = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#fcfcfc;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1a1a1a;">
  <div style="max-width:540px;margin:30px auto;background:#ffffff;border:1px solid #e0e0e0;border-radius:20px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.04);">
    <div style="padding:40px;text-align:center;background:#000000;color:#ffffff;">
      <h1 style="margin:0;font-size:22px;font-weight:900;letter-spacing:-0.5px;text-transform:uppercase;font-style:italic;">Scheduler</h1>
      <div style="margin-top:12px;display:inline-block;padding:4px 12px;background:rgba(255,255,255,0.1);border-radius:100px;font-size:10px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;">Protocol Alpha_01</div>
    </div>
    
    <div style="padding:40px;text-align:center;">
      <p style="margin:0 0 24px 0;font-size:18px;line-height:1.6;font-weight:600;">
        Hello! 👋
      </p>
      <p style="margin:0 0 32px 0;font-size:16px;line-height:1.6;color:#495057;">
        <strong>${data.hostName}</strong> has invited you to pick a time for your next session. They have provided several prioritized windows for you to choose from.
      </p>
      
      <div style="text-align:center;">
        <a href="${data.inviteLink}" style="display:inline-block;background:#000000;color:#ffffff;padding:20px 48px;border-radius:16px;font-size:14px;font-weight:900;text-decoration:none;text-transform:uppercase;letter-spacing:1px;box-shadow:0 10px 20px rgba(0,0,0,0.1);">
          Pick a Time Slot &rarr;
        </a>
      </div>

      <p style="margin:40px 0 0 0;font-size:12px;color:#adb5bd;text-align:center;line-height:1.8;font-weight:500;">
        This invitation is unique to your email address: <strong>${data.guestEmail}</strong>. <br>
        Please use the link above to view the host's real-time availability.
      </p>
    </div>
    
    <div style="padding:24px;background:#f8f9fa;border-top:1px solid #eeeeee;text-align:center;">
      <p style="margin:0;font-size:10px;color:#adb5bd;text-transform:uppercase;letter-spacing:2px;font-weight:800;">
        Propagated by Antigravity Infrastructure
      </p>
    </div>
  </div>
</body>
</html>
    `;

    return this.sendEmail(data.guestEmail, subject, body);
  }
}

export const mailService = new MailService();
