import {
  Media,
  TweetAudience,
  TweetType,
} from '~@modules/tweet/constants/tweet.enum';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { DatabaseTypeormBaseEntityAbstract } from '~@common/database/base/database.typeorm.base.entity';
import { HashTagEntity } from './hashtag.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'tweet' })
export class TweetEntity extends DatabaseTypeormBaseEntityAbstract {
  @Column({ enum: TweetType })
  type: string;

  @Column({ enum: TweetAudience })
  audience: string;

  @Column({})
  content: string;

  @Column({ nullable: true, default: '' })
  parent_id: null | string;

  @Column({ nullable: true })
  guest_views: number;

  @Column({ nullable: true })
  user_views: number;

  @Column({ type: 'jsonb', array: false })
  media: Media[];

  @Column({})
  user_id: string;

  @ManyToMany(() => HashTagEntity, (hashtag) => hashtag.tweet)
  @JoinTable({
    name: 'tweet_hashtag',
    joinColumn: {
      name: 'tweet_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'hashtag_id',
      referencedColumnName: 'id',
    },
  })
  hashTags: HashTagEntity[];

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity[];
}
