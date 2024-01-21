import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FollowUserDto {
  @ApiProperty({
    required: true,
    type: String,
    example: faker.string.uuid(),
  })
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @Type(() => String)
  userid_follower: string;

  @ApiProperty({
    required: true,
    type: String,
    example: faker.string.uuid(),
  })
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @Type(() => String)
  userid_followee: string;
}
