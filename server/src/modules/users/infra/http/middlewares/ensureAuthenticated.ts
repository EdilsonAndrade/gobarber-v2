import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import auth from '@config/auth';
import AppError from '@shared/error/AppError';

interface Decoder {
  iat: string;
  exp: string;
  sub: string;
}
export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const autheader = request.headers.authorization;

    if (autheader === undefined || !autheader) {
      throw new AppError('Jwt is missing', 401);
    }
    const [, token] = autheader?.split(' ');

    const decoder = verify(token, auth.jwt.tokenKey);

    const { sub } = decoder as Decoder;
    request.user = {
      id: sub,
    };
    return next();
  } catch {
    throw new AppError('Invalid jwt', 401);
  }
}
