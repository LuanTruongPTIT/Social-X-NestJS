import { Module } from '@nestjs/common';
import { FollowController } from './controller/follow.controller';
import { FollowRepositoryModule } from '~@modules/follow/repository/follow.repository.module';
import { FollowService } from './services/follow.service';

@Module({
  imports: [FollowRepositoryModule],
  providers: [FollowService],
  controllers: [FollowController],
})
export class FollowModule {}
