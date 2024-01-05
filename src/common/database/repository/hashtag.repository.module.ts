import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashTagEntity } from '../entities/hashtag.entity';
import { HashTagsRepository } from './hashtag.repostiory';

@Global()
@Module({
  providers: [HashTagsRepository],
  exports: [HashTagsRepository],
  imports: [TypeOrmModule.forFeature([HashTagEntity])],
})
export class HashtagRepositoryModule {}
