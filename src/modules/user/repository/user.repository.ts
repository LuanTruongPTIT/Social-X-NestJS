import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@social/common/database/entities/user.entity';
import { Repository } from 'typeorm';
import { BaseAbastractRepository } from '~@common/database/base/base.abstract.repository';

@Injectable()
export class UserRepository extends BaseAbastractRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }
}
