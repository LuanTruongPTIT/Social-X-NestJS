import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AwsCognitoService } from 'src/common/aws/services/aws.cognito.service';
import { UserCreateDto } from '../dtos/user.create.dto';
import { UserService } from '../services/user.service';
import { UserLoginDto } from '../dtos/user.login.dto';
import { Response } from '@social/common/response/decorators/response.decorator';
import { UserPublicSignInDoc, UserPublicSignUpDoc } from '../doc/user.doc';
import { UserVerify } from '../dtos/user.verify';

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

  @UserPublicSignUpDoc()
  @Response('user.signUp')
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

  @UserPublicSignInDoc()
  @Response('user.signIn')
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

  @Response('user.verify-email')
  @Post('/verify-email')
  async VerifyUser(data: UserVerify) {
    const { email, verificationCode } = data;
    try {
      const result = await this.awsCognitoService.verifyUser(
        email,
        verificationCode,
      );
      console.log(result);
      return {
        data: {
          message: 'Verify success',
          statusCode: 201,
        },
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}
