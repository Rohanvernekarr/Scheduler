import { Router, type Response } from 'express';
import { prisma } from '@repo/db';
import type { AuthenticatedRequest } from '../../middleware/auth.js';

const adminRouter: Router = Router();

// Guard: ADMIN only
adminRouter.use((req: AuthenticatedRequest, res: Response, next) => {
  if (req.userRole !== 'ADMIN') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
});

// GET /admin/users
adminRouter.get('/users', async (_req, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true, name: true, email: true, role: true,
        emailVerified: true, createdAt: true, companyId: true,
        username: true, company: { select: { name: true } },
      },
    });
    res.json({ data: { users } });
  } catch (e) {
    console.error('[admin/users]', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /admin/meetings
adminRouter.get('/meetings', async (_req, res: Response) => {
  try {
    const meetings = await prisma.meeting.findMany({
      orderBy: { startTime: 'desc' },
      select: {
        id: true, title: true, type: true, startTime: true,
        endTime: true, meetingLink: true, createdAt: true,
        host: { select: { id: true, name: true, email: true } },
        participants: { select: { id: true, email: true, status: true } },
      },
    });
    res.json({ data: { meetings } });
  } catch (e) {
    console.error('[admin/meetings]', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /admin/bookings
adminRouter.get('/bookings', async (_req, res: Response) => {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true, guestEmail: true,
        startTime: true, endTime: true, status: true, createdAt: true,
        host: { select: { id: true, name: true, email: true } },
      },
    });
    res.json({ data: { bookings } });
  } catch (e) {
    console.error('[admin/bookings]', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /admin/availability
adminRouter.get('/availability', async (_req, res: Response) => {
  try {
    const availability = await prisma.availability.findMany({
      orderBy: { dayOfWeek: 'asc' },
      select: {
        id: true, dayOfWeek: true, startTime: true, endTime: true,
        user: { select: { id: true, name: true, email: true } },
      },
    });
    res.json({ data: { availability } });
  } catch (e) {
    console.error('[admin/availability]', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { adminRouter };
