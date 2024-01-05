import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { BaseAbastractRepository } from '~@common/database/base/base.abstract.repository';
import { HashTagEntity } from '../entities/hashtag.entity';

@Injectable()
export class HashTagsRepository extends BaseAbastractRepository<HashTagEntity> {
  constructor(
    @InjectRepository(HashTagEntity)
    private readonly hashTagRepository: Repository<HashTagEntity>,
  ) {
    super(hashTagRepository);
  }
}
