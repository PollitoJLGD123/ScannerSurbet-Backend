import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config';

export interface TokenPayload {
  userId: number;
  email: string;
}

export const generateToken = (payload: TokenPayload): string => {
  const options: SignOptions = { expiresIn: "24h" };
  return jwt.sign(payload, JWT_SECRET as Secret, options);
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET as Secret) as TokenPayload;
    return decoded;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};