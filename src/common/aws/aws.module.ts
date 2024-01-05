import { Module } from '@nestjs/common';
import { AwsCognitoService } from './services/aws.cognito.service';
import { AwsS3Service } from './services/aws.s3.service';

@Module({
  imports: [],
  providers: [AwsCognitoService, AwsS3Service],
  exports: [AwsCognitoService, AwsS3Service],
})
export class AwsModule {}
