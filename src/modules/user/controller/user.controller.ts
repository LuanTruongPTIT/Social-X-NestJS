import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AwsCognitoService } from 'src/common/aws/services/aws.cognito.service';
import { UserCreateDto } from '../dtos/user.create.dto';
import { UserService } from '../services/user.service';
import { UserLoginDto } from '../dtos/user.login.dto';

@ApiTags('modules.user')
@Controller({
  version: '1',
  path: '/user',
})
export class UserController {
  constructor(
    private readonly awsCognitoService: AwsCognitoService,
    private readonly userService: UserService,
  ) {}

  @Post('/create-user')
  async SignUp(@Body() data: UserCreateDto) {
    try {
      await this.awsCognitoService.signUp(data);
      const user = await this.userService.CreateUser(data);
      return {
        data: {
          user_id: user.id,
        },
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('/login')
  async SignIn(@Body() data: UserLoginDto) {
    try {
      const result = await this.awsCognitoService.SignIn(data);
      console.log('result', result);
      return {
        data: {
          result,
          version: 2,
        },
      };
    } catch (error) {
      console.log(error, 'error');
      throw new BadRequestException(error);
    }
  }
}
