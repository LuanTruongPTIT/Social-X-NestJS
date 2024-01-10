import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TweetEntity } from '@social/common/database/entities/tweet.entity';
import { Repository } from 'typeorm';
import { BaseAbastractRepository } from '~@common/database/base/base.abstract.repository';

@Injectable()
export class TweetRepository extends BaseAbastractRepository<TweetEntity> {
  constructor(
    @InjectRepository(TweetEntity)
    private readonly tweetRepository: Repository<TweetEntity>,
  ) {
    super(tweetRepository);
  }
}
