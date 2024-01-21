import { Module } from '@nestjs/common';
import { FollowModule } from '@social/modules/follow/follow.module';

@Module({
  imports: [FollowModule],
})
export class RoutesFollowModule {}
