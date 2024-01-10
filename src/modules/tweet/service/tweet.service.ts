/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITweetService } from '../interfaces/tweet.service.interface';
import { HashTagsRepository } from '@social/common/database/repository/hashtag.repostiory';
import { Injectable } from '@nestjs/common';
import { TweetEntity } from '@social/common/database/entities/tweet.entity';
import { TweetRepository } from '../repository/tweet.repository';
import { Media } from '../constants/tweet.enum';
import { TweetHashTagsRepository } from '@social/common/database/repository/tweet-hashtag.repository';

@Injectable()
export class TweetService implements ITweetService {
  constructor(
    private readonly hashTagRepository: HashTagsRepository,
    private readonly tweetRepository: TweetRepository,
    private readonly tweetHashTagRepo: TweetHashTagsRepository,
  ) {}

  async findOrCreateHashtag(name: Array<any>): Promise<any> {
    const listIdHashTag = [];
    await Promise.all(
      name.map(async (item) => {
        const result = await this.hashTagRepository.findByField({ name: item });
        if (result) {
          listIdHashTag.push(result.id);
        } else {
          const hashtag = await this.hashTagRepository.create({ name: item });
          listIdHashTag.push(hashtag.id);
        }
        return listIdHashTag;
      }),
    );
    return listIdHashTag;
  }

  async CreateTweet({
    type,
    audience,
    content,
    parent_id,
    hashTags,
    media,
    user_id,
  }: {
    type: string;
    audience: string;
    content: string;
    parent_id?: string;
    hashTags?: string[];
    media: Media[];
    user_id: string;
  }): Promise<TweetEntity> {
    const tweetEntity = new TweetEntity();
    tweetEntity.type = type;
    tweetEntity.audience = audience;
    tweetEntity.content = content;
    tweetEntity.parent_id = parent_id;
    tweetEntity.media = media;
    tweetEntity.user_id = user_id;
    const tweet = await this.tweetRepository.create(tweetEntity);
    console.log(tweet.id);
    console.log(hashTags);

    await Promise.all(
      hashTags.map(async (item) => {
        this.tweetHashTagRepo.create({
          hashTagId: item,
          tweetId: tweet.id,
        });
      }),
    );

    return tweet;
  }

  maptypetweet(data: number): string {
    switch (data) {
      case 0:
        return 'tweet';
      case 1:
        return 'Retweet';
      case 2:
        return 'Comment';
      case 3:
        return 'QuoteTweet';
    }
  }
}
