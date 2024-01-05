import { Column, Entity, ManyToMany } from 'typeorm';
import { DatabaseTypeormBaseEntityAbstract } from '~@common/database/base/database.typeorm.base.entity';
import { TweetEntity } from './tweet.entity';

@Entity({ name: 'hashtag' })
export class HashTagEntity extends DatabaseTypeormBaseEntityAbstract {
  @Column({})
  name: string;

  @ManyToMany(() => TweetEntity, (tweet) => tweet.hashTags)
  tweet: TweetEntity[];
}
