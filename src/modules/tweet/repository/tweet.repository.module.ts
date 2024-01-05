import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetEntity } from '@social/common/database/entities/tweet.entity';

@Module({
  providers: [],
  exports: [],
  imports: [TypeOrmModule.forFeature([TweetEntity])],
})
export class TweetRepositoryModule {}
