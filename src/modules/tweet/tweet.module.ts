import { Module } from '@nestjs/common';
import { TweetController } from './controller/tweet.controller';
import { TweetRepositoryModule } from './repository/tweet.repository.module';
import { TweetService } from './service/tweet.service';
import { TweetHashtagRepositoryModule } from '@social/common/database/repository/tweet-hashtag.repository.module';

@Module({
  imports: [TweetRepositoryModule, TweetHashtagRepositoryModule],
  exports: [TweetRepositoryModule, TweetHashtagRepositoryModule],
  providers: [TweetService],
  controllers: [TweetController],
})
export class TweetModule {}
