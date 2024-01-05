import { ApiProperty } from '@nestjs/swagger';
import {
  Media,
  TweetAudience,
  TweetType,
} from '@social/modules/tweet/constants/tweet.enum';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTweetDto {
  @ApiProperty({
    required: true,
    enum: TweetType,
  })
  @IsOptional()
  @IsEnum(TweetType)
  type: TweetType;

  @ApiProperty({
    required: true,
    enum: TweetAudience,
  })
  @IsOptional()
  @IsEnum(TweetAudience)
  audience: TweetAudience;

  @ApiProperty({
    required: true,
    type: String,
    maxLength: 100,
    example: 'My image is beautiful',
  })
  @IsOptional()
  @MaxLength(100)
  @IsString()
  @Type(() => String)
  content: string;

  @ApiProperty({
    required: false,
    default: '',
  })
  @IsOptional()
  parent_id: null | string[];

  @ApiProperty({
    required: false,
    nullable: true,
    type: Array,
    default: '',
    example: ['picture'],
  })
  @IsOptional()
  @IsArray()
  hashtags: string[] | null;

  @ApiProperty({
    type: Array<Media>,
    required: true,
    example: [
      {
        type: 'image',
        url: './url',
      },
    ],
  })
  @IsArray()
  media: Media[];
}
