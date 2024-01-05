/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { HelperFileVideoService } from '@social/common/helper/services/helper.file-video.service';
import { HelperFileService } from '@social/common/helper/services/helper.file.service';
import { HelperStringService } from '@social/common/helper/services/helper.string.service';
import { Job } from 'bullmq';
import { UPLOAD_VIDEO_DIR, UPLOAD_VIDEO_TWEET } from '../constants/dir';
import { AwsS3Service } from '@social/common/aws/services/aws.s3.service';
import path from 'path';
import mime from 'mime';
import { ConfigService } from '@nestjs/config';

@Processor('encode:video')
export class EncodeVideoHls extends WorkerHost {
  logger = new Logger();
  constructor(
    private readonly helperFileVideoService: HelperFileVideoService,
    private readonly helperFileService: HelperFileService,
    private readonly helperStringService: HelperStringService,
    private readonly awsS3Service: AwsS3Service,
  ) {
    super();
  }

  async process(job: Job<any, any, string>, token?: string): Promise<any> {
    const { destinationDirectory, idName, fileName } = job.data;
    console.log(job.data);
    const filePath = path.resolve(destinationDirectory, fileName);
    console.log(filePath);

    await this.helperFileVideoService.encodeHLSWithMultipleVideoStreams(
      filePath,
    );
    await this.helperFileService.DeleteFile(filePath);
    const files: string[] =
      this.helperFileService.GetFile(destinationDirectory);
    console.log(files);
    await Promise.all([
      files.map((filePath) => {
        const fileName =
          'video-hls' + filePath.replace(path.resolve(UPLOAD_VIDEO_DIR), '');
        console.log('fileName', fileName);
        const contentType = mime.getType(filePath) as string;
        return this.awsS3Service.putItemVideoInBucket(
          fileName,
          filePath,
          contentType,
        );
      }),
    ]);
    // https://social-x-bucket.s3.ap-southeast-1.amazonaws.com/video-hls/LLhcAWczhXI-_AOdVbHhG/master.m3u8
  }
}
