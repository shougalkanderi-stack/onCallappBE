import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken"
export interface TokenPayload {
  providerId: string;
  role: string;
}
declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string;
      role: string;
    };
  }
}
const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    res.status(500).json({ message: 'JWT_SECRET not defined' });
    return;
  }

  try {
    // Encode secret to Uint8Array for jose
    const secretKey = new TextEncoder().encode(secret);

    // Verify token with jose
    const payload  = jwt.verify(token, secret);

    (req as any).user = payload

    next();
  } catch (error) {
    console.error('JWT verification failed:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
export default authenticate;
