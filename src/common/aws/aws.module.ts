import { Module } from '@nestjs/common';
import { AwsCognitoService } from './services/aws.cognito.service';

@Module({
  imports: [],
  providers: [AwsCognitoService],
  exports: [AwsCognitoService],
})
export class AwsModule {}
