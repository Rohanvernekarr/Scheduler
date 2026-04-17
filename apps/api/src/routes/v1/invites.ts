import { Router } from 'express';
import { mailService } from '../../services/mail.js';

const inviteRouter: Router = Router();

inviteRouter.post('/send', async (req, res) => {
  try {
    const { hostName, guestEmail, inviteLink, slots } = req.body;
    
    if (!guestEmail || !inviteLink || !slots || !Array.isArray(slots)) {
       res.status(400).json({ error: 'Missing required fields or invalid slots array' });
       return;
    }

    await mailService.sendTargetedInvite({
      hostName: hostName || 'A Host',
      guestEmail,
      inviteLink,
      slots
    });

    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error: any) {
    console.error('[InviteRouter] Error:', error);
    res.status(500).json({ error: 'Failed to send invite' });
  }
});

export { inviteRouter };
