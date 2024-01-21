import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserVerify {
  @ApiProperty({
    required: true,
    example: faker.internet.email(),
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'code in order to verify email',
  })
  @IsOptional()
  @IsString()
  @Type(() => String)
  verificationCode: string;
}
