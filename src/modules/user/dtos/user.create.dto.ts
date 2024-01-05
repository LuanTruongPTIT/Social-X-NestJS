import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
  @ApiProperty({
    example: faker.internet.email(),
    required: true,
  })
  email: string;

  @ApiProperty({
    description: 'string password',
    example: `${faker.string.alphanumeric(5).toLowerCase()}${faker.string
      .alphanumeric(5)
      .toUpperCase()}@@!123`,
    required: true,
  })
  password: string;

  @ApiProperty({
    example: faker.internet.userName(),
    nullable: true,
    required: false,
  })
  username: string;
}
