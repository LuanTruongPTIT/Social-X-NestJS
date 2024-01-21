import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '~@common/database/entities/user.entity';
import { UserRepository } from './user.repository';
import { TweetRepositoryModule } from '@social/modules/tweet/repository/tweet.repository.module';

@Global()
@Module({
  providers: [UserRepository],
  exports: [UserRepository],
  imports: [TypeOrmModule.forFeature([UserEntity]), TweetRepositoryModule],
})
export class UserRepositoryModule {}
