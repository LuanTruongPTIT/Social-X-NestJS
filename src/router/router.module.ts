/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common';
import { RoutesUserModule } from './routes/routes.user.module';
import { RouterModule as NestJsRouterModule } from '@nestjs/core';
import { RoutesTweetModule } from './routes/routes.tweet.module';
import { RoutesFileModule } from './routes/routes.file.module';
import { RoutesFollowModule } from './routes/routes.follow.module';
@Module({})
export class RouterModule {
  static forRoot(): DynamicModule {
    const imports: (
      | DynamicModule
      | Type<any>
      | Promise<DynamicModule>
      | ForwardReference
    )[] = [];
    console.log(process.env.HTTP_ENABLE);
    if (process.env.HTTP_ENABLE === 'true') {
      imports.push(
        RoutesUserModule,
        RoutesTweetModule,
        RoutesFileModule,
        RoutesFollowModule,
        NestJsRouterModule.register([
          {
            path: '/user',
            module: RoutesUserModule,
          },
          {
            path: '/tweet',
            module: RoutesTweetModule,
          },
          {
            path: '/file',
            module: RoutesFileModule,
          },
          {
            path: '/follow',
            module: RoutesFollowModule,
          },
        ]),
      );
    }
    return {
      module: RouterModule,
      providers: [],
      exports: [],
      controllers: [],
      imports,
    };
  }
}
