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
    const body = `
      <h1>You have been invited to a meeting!</h1>
      <p><strong>Title:</strong> ${meeting.title}</p>
      <p><strong>Type:</strong> ${meeting.type}</p>
      <p><strong>Start Time:</strong> ${new Date(meeting.startTime).toLocaleString()}</p>
      <p><strong>Meeting Link:</strong> <a href="${meeting.meetingLink}">${meeting.meetingLink || 'N/A'}</a></p>
      <br/>
      <p><strong>Description:</strong> ${meeting.description || 'No description provided.'}</p>
    `;

    return this.sendEmail(participantEmail, subject, body);
  }
}

export const mailService = new MailService();
