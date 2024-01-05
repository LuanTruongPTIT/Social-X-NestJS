import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTweetDto } from '@social/modules/tweet/dtos/tweet.create.dto';
import { TweetService } from '../service/tweet.service';

@ApiTags('modules.tweet')
@Controller({
  version: '1',
  path: '/tweet',
})
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}
  @Post('/create-tweet')
  async CreateTweet(@Body() data: CreateTweetDto) {
    const { hashtags } = data;
    const result = await this.tweetService.findOrCreateHashtag(hashtags);
    return result;
  }
}
