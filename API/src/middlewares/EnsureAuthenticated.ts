import { sub } from "date-fns";
import { Request, Response, NextFunction } from "express";
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth'

interface TokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}

export default function EnsureAuthenticated(request: Request, response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');

  response.locals.tokenUser = token;

  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub } = decoded as TokenPayLoad;
    request.user = {
      id: sub,
    };
    return next();
  } catch (err) {
    throw new Error('Invalid jwt token');
  }
}
