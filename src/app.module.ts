import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { RouterModule } from './router/router.module';
import { BullModule } from '@nestjs/bullmq';
import { ConfigService } from '@nestjs/config';
import { TimelineGateWay } from './modules/timeline/controller/timeline.socket';

@Module({
  imports: [
    CommonModule,
    RouterModule.forRoot(),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        connection: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        },
      }),
    }),
  ],
  controllers: [],
  providers: [TimelineGateWay],
})
export class AppModule {}
