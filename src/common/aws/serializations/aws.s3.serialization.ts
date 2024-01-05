import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class AwsS3Serialization {
  @ApiProperty({
    required: true,
    nullable: false,
    example: faker.system.directoryPath(),
  })
  @Type(() => String)
  path: string;

  @ApiProperty({
    required: true,
    nullable: false,
    example: faker.system.filePath(),
  })
  @Type(() => String)
  pathWithFileName: string;

  @ApiProperty({
    required: true,
    nullable: false,
    example: faker.system.fileName(),
  })
  filename: string;

  @ApiProperty({
    required: true,
    nullable: false,
    example: `${faker.internet.url()}/${faker.system.filePath()}`,
  })
  @Type(() => String)
  completedUrl: string;

  @ApiProperty({
    required: true,
    nullable: false,
    example: faker.internet.url(),
  })
  @Type(() => String)
  baseUrl: string;

  @ApiProperty({
    required: true,
    nullable: false,
    example: faker.system.mimeType(),
  })
  @Type(() => String)
  mime: string;
}
