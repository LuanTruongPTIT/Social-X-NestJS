import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { AwsModule } from 'src/common/aws/aws.module';

@Module({
  imports: [AwsModule],
  providers: [],
  controllers: [UserController],
})
export class UserModule {}
