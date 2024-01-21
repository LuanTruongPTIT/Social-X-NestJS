import { Column, Entity } from 'typeorm';
import { DatabaseTypeormBaseEntityAbstract } from '../base/database.typeorm.base.entity';

@Entity({ name: 'follow' })
export class FollowEntity extends DatabaseTypeormBaseEntityAbstract {
  @Column({})
  userIdFollower: string;

  @Column({})
  userIdFollowee: string;
}
