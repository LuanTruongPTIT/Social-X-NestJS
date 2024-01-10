import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { BaseAbastractRepository } from '~@common/database/base/base.abstract.repository';
import { TweetHashTagEntity } from '../entities/tweet-hashtag.entity';

@Injectable()
export class TweetHashTagsRepository extends BaseAbastractRepository<TweetHashTagEntity> {
  constructor(
    @InjectRepository(TweetHashTagEntity)
    private readonly tweetHashTagRepository: Repository<TweetHashTagEntity>,
  ) {
    super(tweetHashTagRepository);
  }
}
