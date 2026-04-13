import type { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

/**
 * Basic authentication middleware.
 * For now, it expects a 'x-user-id' header. 
 * This allows us to test the API easily before full OIDC/JWT integration.
 */
export function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const userId = req.headers['x-user-id'] as string;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized: Missing User ID header' });
  }

  // Inject userId into request for use in controllers
  req.userId = userId;
  next();
}
