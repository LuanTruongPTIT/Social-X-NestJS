import { Column, Entity } from 'typeorm';
import { DatabaseTypeormBaseEntityAbstract } from '~@common/database/base/database.typeorm.base.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'TokenEntity' })
export class TokenEntity extends DatabaseTypeormBaseEntityAbstract {
  @Column({})
  token: string;

  @Column(() => UserEntity)
  userID: UserEntity[];
}
