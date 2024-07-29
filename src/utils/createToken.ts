import * as jwt from 'jsonwebtoken';

export function createToken(userId: string): string {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}
