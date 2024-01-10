import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetEntity } from '@social/common/database/entities/tweet.entity';
import { TweetRepository } from './tweet.repository';

@Module({
  providers: [TweetRepository],
  exports: [TweetRepository],
  imports: [TypeOrmModule.forFeature([TweetEntity])],
})
export class TweetRepositoryModule {}
