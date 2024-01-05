import { AwsModule } from 'src/common/aws/aws.module';
import { Module } from '@nestjs/common';
import { FileController } from './controller/file.controller';
import { FileService } from './services/file.service';
import { BullModule } from '@nestjs/bullmq';
import { EncodeVideoHls } from './queues/file.queue';

@Module({
  imports: [
    AwsModule,
    BullModule.registerQueue({
      name: 'encode:video',
      prefix: 'file-module',
    }),
  ],
  controllers: [FileController],
  providers: [FileService, EncodeVideoHls],
  exports: [FileService],
})
export class FileModule {}
