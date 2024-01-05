import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { AwsModule } from 'src/common/aws/aws.module';
import { UserRepositoryModule } from '~@modules/user/repository/user.repository.module';
import { UserService } from './services/user.service';

@Module({
  imports: [AwsModule, UserRepositoryModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
