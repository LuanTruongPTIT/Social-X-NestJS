import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetHashTagEntity } from '../entities/tweet-hashtag.entity';
import { TweetHashTagsRepository } from './tweet-hashtag.repository';

@Global()
@Module({
  providers: [TweetHashTagsRepository],
  exports: [TweetHashTagsRepository],
  imports: [TypeOrmModule.forFeature([TweetHashTagEntity])],
})
export class TweetHashtagRepositoryModule {}
