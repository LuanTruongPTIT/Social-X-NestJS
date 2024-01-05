import { Module } from '@nestjs/common';
import { TweetController } from './controller/tweet.controller';
import { TweetRepositoryModule } from './repository/tweet.repository.module';
import { TweetService } from './service/tweet.service';

@Module({
  imports: [TweetRepositoryModule],
  exports: [TweetRepositoryModule],
  providers: [TweetService],
  controllers: [TweetController],
})
export class TweetModule {}
