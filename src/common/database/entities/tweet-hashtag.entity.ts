import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { HashTagEntity } from './hashtag.entity';
import { TweetEntity } from './tweet.entity';

@Entity({ name: 'tweet_hashtag' })
export class TweetHashTagEntity {
  @PrimaryColumn({ name: 'hashtag_id' })
  hashTagId: string;

  @PrimaryColumn({ name: 'tweet_id' })
  tweetId: string;

  @ManyToOne(() => HashTagEntity, (hashtag) => hashtag.tweet)
  @JoinColumn([{ name: 'hashtag_id', referencedColumnName: 'id' }])
  hashtag: HashTagEntity[];

  @ManyToOne(() => TweetEntity, (tweet) => tweet.hashTags)
  @JoinColumn([{ name: 'tweet_id', referencedColumnName: 'id' }])
  tweet: TweetEntity[];
}
