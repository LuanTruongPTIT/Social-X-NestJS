import { Entity } from 'typeorm';
import { DatabaseTypeormBaseEntityAbstract } from '../base/database.typeorm.base.entity';

@Entity({ name: 'File' })
export class FileEntity extends DatabaseTypeormBaseEntityAbstract {}
