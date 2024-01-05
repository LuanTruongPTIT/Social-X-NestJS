import { DatabaseEntityAbstract } from '@social/common/database/base/database.base-entity.abstract';
import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class DatabaseTypeormBaseEntityAbstract
  extends BaseEntity
  implements DatabaseEntityAbstract<string>
{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: () => 'now()',
    name: 'created_at',
  })
  created_at: Date;

  @Column({
    default: () => 'now()',
    name: 'updated_at',
  })
  updated_at: Date;

  @Column({
    default: () => 'now()',
    name: 'deleted_at',
  })
  deleted_at: Date;
}
