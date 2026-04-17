import { prisma } from 'db';
import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
  console.error('[MailService] Error: RESEND_API_KEY is not defined in environment variables.');
}

const resend = new Resend(RESEND_API_KEY || 'MISSING_KEY');
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@rohanrv.tech';

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
    
    const date = new Date(meeting.startTime);
    // Formatting to match: Wednesday 15 Apr 2026 · 2:45pm - 3:00pm
    const dateStr = date.toLocaleDateString('en-GB', { 
      weekday: 'long', 
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    const timeStr = date.toLocaleTimeString('en-GB', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true
    }).toLowerCase();
const body = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#ffffff;font-family:Roboto,Arial,sans-serif;color:#3c4043;line-height:1.3;">

<div style="max-width:720px;margin:2px auto;border:1px solid #e0e0e0;border-radius:6px;padding:10px;">

<table width="100%" cellspacing="0" cellpadding="0">
<tr>
<td>

<h1 style="margin:0;font-size:17px;font-weight:500;color:#202124;">
${meeting.title}
</h1>

<p style="margin:2px 0 10px 0;font-size:12px;color:#70757a;">
${dateStr} · ${timeStr}
</p>

<table width="100%" cellspacing="0" cellpadding="0">
<tr>

<td width="55%" style="vertical-align:top;padding-right:14px;border-right:1px solid #f1f3f4;">

<p style="margin:0;font-size:10px;font-weight:700;color:#5f6368;text-transform:uppercase;">
Booked by
</p>

<p style="margin:2px 0 0 0;font-size:13px;color:#202124;font-weight:500;">
Rohan Vernekar
</p>

<a href="mailto:${participantEmail}" style="font-size:12px;color:#4759df;text-decoration:none;">
${participantEmail}
</a>

<div style="margin-top:12px;">
<a href="#" style="display:inline-block;padding:5px 10px;border:1px solid #dadce0;border-radius:4px;color:#4759df;font-size:12px;text-decoration:none;">
Cancel appointment
</a>
</div>

</td>

<td width="45%" style="vertical-align:top;padding-left:16px;">

<a href="${meeting.meetingLink}" style="display:inline-block;background:#4759df;color:#ffffff;padding:6px 14px;border-radius:4px;font-size:12px;text-decoration:none;margin-bottom:10px;">
Join Meeting
</a>

<p style="margin:0;font-size:10px;font-weight:700;color:#5f6368;text-transform:uppercase;">
Meeting link
</p>

<p style="margin:2px 0 6px 0;font-size:12px;color:#70757a;word-break:break-all;">
${meeting.meetingLink}
</p>

<a href="#" style="font-size:12px;color:#4759df;text-decoration:none;">
Test setup
</a>

</td>

</tr>
</table>

</td>
</tr>
</table>

</div>

<div style="max-width:720px;margin:4px auto;text-align:center;">
<p style="font-size:10px;color:#bdc1c6;margin:0;">
Sent via Scheduler · One-click booking
</p>
</div>

</body>
</html>
`;

    return this.sendEmail(participantEmail, subject, body);
  }


  async sendTargetedInvite(data: {
    hostName: string;
    date: string;
    startTime: string;
    endTime: string;
    duration: number;
    guestEmail: string;
    inviteLink: string;
  }) {
    const subject = `Invitation to book a session with ${data.hostName}`;
    const dateObj = new Date(data.date);
    const dateStr = dateObj.toLocaleDateString('en-GB', { 
      weekday: 'long', 
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const body = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f8f9fa;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#212529;">
  <div style="max-width:600px;margin:20px auto;background:#ffffff;border:1px solid #dee2e6;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.05);">
    <div style="padding:40px;text-align:center;background:#000000;color:#ffffff;">
      <h1 style="margin:0;font-size:24px;font-weight:800;letter-spacing:-0.5px;text-transform:uppercase;">Scheduler</h1>
      <p style="margin:10px 0 0 0;font-size:14px;opacity:0.6;letter-spacing:1px;font-weight:700;">SYSTEM_INVITE_V1</p>
    </div>
    
    <div style="padding:40px;">
      <p style="margin:0 0 24px 0;font-size:16px;line-height:1.6;">
        Hello, <br><br>
        <strong>${data.hostName}</strong> has invited you to book a session on <strong>${dateStr}</strong>.
      </p>
      
      <div style="background:#f1f3f5;border-radius:8px;padding:24px;margin-bottom:32px;border-left:4px solid #000000;">
        <p style="margin:0 0 8px 0;font-size:12px;font-weight:700;color:#868e96;text-transform:uppercase;letter-spacing:1px;">Session Parameters</p>
        <p style="margin:0 0 4px 0;font-size:15px;"><strong>Duration:</strong> ${data.duration} minutes</p>
        <p style="margin:0 0 4px 0;font-size:15px;"><strong>Window:</strong> ${data.startTime} — ${data.endTime}</p>
        <p style="margin:0;font-size:15px;"><strong>Date:</strong> ${dateStr}</p>
      </div>

      <div style="text-align:center;">
        <a href="${data.inviteLink}" style="display:inline-block;background:#000000;color:#ffffff;padding:16px 32px;border-radius:8px;font-size:15px;font-weight:700;text-decoration:none;transition:all 0.2s;">
          Pick a Time Slot
        </a>
      </div>

      <p style="margin:32px 0 0 0;font-size:13px;color:#868e96;text-align:center;line-height:1.6;">
        This is a unique, one-time booking link. If you have questions, please contact the host directly at ${data.guestEmail}.
      </p>
    </div>
    
    <div style="padding:24px;background:#f8f9fa;border-top:1px solid #dee2e6;text-align:center;">
      <p style="margin:0;font-size:11px;color:#adb5bd;text-transform:uppercase;letter-spacing:2px;font-weight:700;">
        Powered by Antigravity Scheduler
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
