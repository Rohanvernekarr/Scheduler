import { Router, type Response } from 'express';
import { prisma } from '@repo/db';
import type { AuthenticatedRequest } from '../../middleware/auth.js';

const adminRouter: Router = Router();

adminRouter.use((req: AuthenticatedRequest, res: Response, next) => {
  if (req.userRole !== 'ADMIN') {
    return res.status(403).json({ error: 'Forbidden: You are not allowed to list users' });
  }
  next();
});

adminRouter.get('/users', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        emailVerified: true,
        createdAt: true,
        companyId: true,
      }
    });
    
    res.json({ data: { users } });
  } catch (error) {
    console.error('[AdminRouter.getUsers]', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { adminRouter };
