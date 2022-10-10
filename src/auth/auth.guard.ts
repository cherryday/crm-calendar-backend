import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jsonwebtoken from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    if (!request.headers.authorization) {
      throw new UnauthorizedException();
    }

    const accessToken = request.headers.authorization.replace('Bearer ', '');

    try {
      const payload = jsonwebtoken.verify(
        accessToken,
        process.env.JWT_SECRET_KEY,
      );
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
