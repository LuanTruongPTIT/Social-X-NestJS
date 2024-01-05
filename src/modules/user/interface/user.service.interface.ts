import { UserEntity } from '@social/common/database/entities/user.entity';
import { UserCreateDto } from '../dtos/user.create.dto';

export interface IUserService {
  // emailExist: () => Promise<boolean>;
  CreateUser: (data: UserCreateDto) => Promise<UserEntity>;
}
