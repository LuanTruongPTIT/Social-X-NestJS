import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ENUM_DOC_REQUEST_BODY_TYPE } from '@social/common/doc/constants/doc.enum.constant';
import {
  Doc,
  DocRequest,
  DocResponse,
} from '@social/common/doc/decorators/doc.decorator';
import { UserCreateDto } from '../dtos/user.create.dto';
import { UserLoginDto } from '../dtos/user.login.dto';

export function UserPublicSignUpDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'sign up a user',
    }),
    DocRequest({
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
      body: UserCreateDto,
    }),

    DocResponse('user.signUp', {
      httpStatus: HttpStatus.CREATED,
    }),
  );
}

export function UserPublicSignInDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'sign in a user',
    }),
    DocRequest({
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
      body: UserLoginDto,
    }),

    DocResponse('user.signIn', {
      httpStatus: HttpStatus.OK,
    }),
  );
}
