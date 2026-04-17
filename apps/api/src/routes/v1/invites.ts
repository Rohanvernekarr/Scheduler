import { Router } from 'express';
import { mailService } from '../../services/mail.js';
import { inviteService } from '../../services/invites.js';

const inviteRouter: Router = Router();

// Send and Save Invite
inviteRouter.post('/send', async (req, res) => {
  try {
    const { hostId, hostName, guestEmail, inviteLink, slots, meetingLink } = req.body;
    
    if (!guestEmail || !inviteLink || !slots || !Array.isArray(slots)) {
       res.status(400).json({ error: 'Missing required fields or invalid slots array' });
       return;
    }

    // 1. Save to Database
    // Extract ID from link (assuming format is .../invite/{id})
    const inviteId = inviteLink.split('/').pop();
    
    await inviteService.createTargetedInvite({
      hostId: hostId || 'cm9lndj6y0000ux3v8x9r9fzb', // Default for now
      guestEmail,
      inviteLink: inviteId, // We save the ID part as the unique link identifier
      meetingLink,
      slots
    });

    // 2. Send Email
    await mailService.sendTargetedInvite({
      hostName: hostName || 'A Host',
      guestEmail,
      inviteLink,
      slots
    });

    res.json({ success: true, message: 'Invite saved and email sent' });
  } catch (error: any) {
    console.error('[InviteRouter] Error:', error);
    res.status(500).json({ error: 'Failed to process invite' });
  }
});

// Get Invite Details
inviteRouter.get('/:id', async (req, res) => {
  try {
    const invite = await inviteService.getInviteByLinkId(req.params.id);
    if (!invite) {
      res.status(404).json({ error: 'Invite not found' });
      return;
    }
    res.json({ data: invite });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch invite' });
  }
});

// Book a Slot
inviteRouter.post('/book', async (req, res) => {
  try {
    const { slotId, guestName, guestEmail } = req.body;
    if (!slotId || !guestName || !guestEmail) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const booking = await inviteService.bookSlot(slotId, guestName, guestEmail);
    res.json({ success: true, data: booking });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to book slot' });
  }
});

export { inviteRouter };
