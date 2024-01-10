/* eslint-disable @typescript-eslint/no-explicit-any */

import { TweetEntity } from '@social/common/database/entities/tweet.entity';
import { Media } from '../constants/tweet.enum';

export interface ITweetService {
  findOrCreateHashtag: (name: Array<any>) => Promise<any>;
  CreateTweet: ({
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
    parent_id?: string | null;
    hashTags?: string[];
    media: Media[];
    user_id: string;
  }) => Promise<TweetEntity>;
  maptypetweet: (data: number) => string;
}
