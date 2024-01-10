/* eslint-disable camelcase */
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
    const { type, audience, content, parent_id, hashtags, media, user_id } =
      data;
    const hashTags = await this.tweetService.findOrCreateHashtag(hashtags);
    const audienceType = audience === 0 ? 'Everyone' : 'TwitterCircle';
    const typeTweet = this.tweetService.maptypetweet(type);
    return await this.tweetService.CreateTweet({
      type: typeTweet,
      audience: audienceType,
      content,
      parent_id,
      hashTags,
      media,
      user_id,
    });
  }
}
