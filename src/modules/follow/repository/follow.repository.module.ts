import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowEntity } from '@social/common/database/entities/follow.entity';
import { FollowRepository } from './follow.repository';

@Module({
  providers: [FollowRepository],
  exports: [FollowRepository],
  imports: [TypeOrmModule.forFeature([FollowEntity])],
})
export class FollowRepositoryModule {}
