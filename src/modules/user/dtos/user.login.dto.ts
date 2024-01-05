import { OmitType } from '@nestjs/swagger';
import { UserCreateDto } from './user.create.dto';

export class UserLoginDto extends OmitType(UserCreateDto, ['username']) {}
