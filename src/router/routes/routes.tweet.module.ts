import { Module } from '@nestjs/common';
import { TweetModule } from '@social/modules/tweet/tweet.module';

@Module({
  imports: [TweetModule],
})
export class RoutesTweetModule {}
