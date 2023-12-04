import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AwsCognitoService } from 'src/common/aws/services/aws.cognito.service';
import { UserCreateDtO } from '../dtos/user.create.dto';

@ApiTags('modules.user.user')
@Controller({
  version: '1',
  path: '/user',
})
export class UserController {
  constructor(private readonly awsCognitoService: AwsCognitoService) {}

  @Post('/create-user')
  async SignUp(@Body() data: UserCreateDtO) {
    await this.awsCognitoService.signUp(data);
  }
}
