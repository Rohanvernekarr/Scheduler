import { Router } from 'express';
import { mailService } from '../../services/mail.js';

const inviteRouter: Router = Router();

inviteRouter.post('/send', async (req, res) => {
  try {
    const { hostName, date, startTime, endTime, duration, guestEmail, inviteLink } = req.body;
    
    if (!guestEmail || !inviteLink) {
       res.status(400).json({ error: 'Missing required fields' });
       return;
    }

    await mailService.sendTargetedInvite({
      hostName: hostName || 'A Host',
      date,
      startTime,
      endTime,
      duration,
      guestEmail,
      inviteLink
    });

    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error: any) {
    console.error('[InviteRouter] Error:', error);
    res.status(500).json({ error: 'Failed to send invite' });
  }
});

export { inviteRouter };
