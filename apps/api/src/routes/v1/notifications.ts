import { Router } from 'express';
import { notificationService } from '../../services/notifications.js';
import type { AuthenticatedRequest } from '../../middleware/auth.js';

const router = Router();

/**
 * @route GET /api/v1/notifications/settings
 * @desc Get current user's notification settings
 */
router.get('/settings', async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;
  
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const settings = await notificationService.getSettings(userId);
    res.json(settings);
  } catch (error) {
    console.error('[NotificationsRoute] Error fetching settings:', error);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

/**
 * @route PATCH /api/v1/notifications/settings
 * @desc Update current user's notification settings
 */
router.patch('/settings', async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const settings = await notificationService.updateSettings(userId, req.body);
    res.json(settings);
  } catch (error) {
    console.error('[NotificationsRoute] Error updating settings:', error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

export default router;
