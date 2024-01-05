import { UserEntity } from '@social/common/database/entities/user.entity';
import { UserCreateDto } from '../dtos/user.create.dto';
import { IUserService } from '../interface/user.service.interface';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async CreateUser(data: UserCreateDto): Promise<UserEntity> {
    const userEntity = new UserEntity();
    userEntity.email = data.email;
    userEntity.password = data.password;
    userEntity.username = data.email;
    return await this.userRepository.create(data);
  }
}
