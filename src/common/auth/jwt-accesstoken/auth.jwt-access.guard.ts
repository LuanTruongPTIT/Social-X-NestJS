import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthJwtAccessToken extends AuthGuard('jwt') {
  handleRequest<TUser = any>(err: Error, user: TUser, info: Error): TUser {
    if (err || !user) {
      throw new UnauthorizedException({
        statusCode: 5000,
        message: 'auth.error.accessTokenUnauthorized',
        _error: err ? err.message : info.message,
      });
    }
  }
}
