import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowEntity } from '@social/common/database/entities/follow.entity';
import { Repository } from 'typeorm';
import { BaseAbastractRepository } from '~@common/database/base/base.abstract.repository';

@Injectable()
export class FollowRepository extends BaseAbastractRepository<FollowEntity> {
  constructor(
    @InjectRepository(FollowEntity)
    private readonly followRepository: Repository<FollowEntity>,
  ) {
    super(followRepository);
  }
}
