import type { Request, Response, NextFunction } from 'express';
import { auth } from '@repo/auth';
import { fromNodeHeaders } from "better-auth/node";

export interface AuthenticatedRequest extends Request {
  userId?: string;
  userRole?: string | null | undefined;
}

/**
 * Authentication middleware using Better Auth.
 */
export async function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers)
  });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or missing session' });
  }

  // Inject userId and userRole into request for use in controllers
  req.userId = session.user.id;
  req.userRole = session.user.role;
  next();
}
