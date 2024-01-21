import { DynamicModule, Module } from '@nestjs/common';
import { AuthJwtAccessToken } from './jwt-accesstoken/auth.jwt-access.guard';

@Module({})
export class AuthModule {
  static forRoot(): DynamicModule {
    return {
      module: AuthModule,
      providers: [AuthJwtAccessToken],
      exports: [],
      controllers: [],
      imports: [],
    };
  }
}
