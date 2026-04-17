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
    guestEmail: string;
    inviteLink: string;
    slots: Array<{
      date: string;
      startTime: string;
      endTime: string;
      duration: number;
    }>;
  }) {
    const subject = `Priority Invitation: Book your session with ${data.hostName}`;
    
    const slotsHtml = data.slots.map(slot => {
      const d = new Date(slot.date).toLocaleDateString('en-GB', { 
        weekday: 'short', day: 'numeric', month: 'short' 
      });
      return `
        <div style="padding:12px 16px;background:#f8f9fa;border-radius:10px;border:1px solid #dee2e6;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;">
          <div style="font-size:14px;font-weight:700;">${d}</div>
          <div style="font-size:13px;color:#495057;">${slot.startTime} &mdash; ${slot.endTime} (${slot.duration}m)</div>
        </div>
      `;
    }).join('');

    const body = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#fcfcfc;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1a1a1a;">
  <div style="max-width:540px;margin:30px auto;background:#ffffff;border:1px solid #e0e0e0;border-radius:20px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.04);">
    <div style="padding:40px;text-align:center;background:#000000;color:#ffffff;">
      <h1 style="margin:0;font-size:22px;font-weight:900;letter-spacing:-0.5px;text-transform:uppercase;font-style:italic;">Scheduler</h1>
      <div style="margin-top:12px;display:inline-block;padding:4px 12px;background:rgba(255,255,255,0.1);border-radius:100px;font-size:10px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;">Protocol Alpha_01</div>
    </div>
    
    <div style="padding:40px;">
      <p style="margin:0 0 24px 0;font-size:16px;line-height:1.6;font-weight:500;">
        Hello, <br><br>
        <strong>${data.hostName}</strong> has prepared a targeted scheduling session for you. They have prioritized the following windows:
      </p>
      
      <div style="margin-bottom:32px;">
        ${slotsHtml}
      </div>

      <div style="text-align:center;">
        <a href="${data.inviteLink}" style="display:inline-block;background:#000000;color:#ffffff;padding:18px 40px;border-radius:14px;font-size:14px;font-weight:900;text-decoration:none;text-transform:uppercase;letter-spacing:1px;box-shadow:0 10px 20px rgba(0,0,0,0.1);">
          Secure Time Slot &rarr;
        </a>
      </div>

      <p style="margin:35px 0 0 0;font-size:12px;color:#868e96;text-align:center;line-height:1.8;font-weight:500;">
        This invitation is encrypted and limited to your email. <br>
        If you have questions, please contact the host directly.
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
