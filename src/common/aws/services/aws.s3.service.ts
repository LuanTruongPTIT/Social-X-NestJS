import fs from 'fs';
/* eslint-disable no-useless-catch */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Readable } from 'stream';
import { IAwsS3PutItemOptions } from '../interfaces/aws.interface';
import { IAwsS3Service } from '../interfaces/aws.s3-service.interface';
import { AwsS3Serialization } from '../serializations/aws.s3.serialization';
import {
  ObjectCannedACL,
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Upload } from '@aws-sdk/lib-storage';
@Injectable()
export class AwsS3Service implements IAwsS3Service {
  private readonly s3Client: S3Client;
  private readonly bucket: string;
  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      credentials: {
        accessKeyId: this.configService.get<string>('aws.s3.credential.key'),
        secretAccessKey: this.configService.get<string>(
          'aws.s3.credential.secret',
        ),
      },
      region: this.configService.get<string>('aws.s3.region'),
    });
    this.bucket = this.configService.get<string>('aws.s3.bucket');
  }

  async putItemVideoInBucket(
    filename: string,
    filePath: string,
    contentType: string,
    options?: IAwsS3PutItemOptions,
  ) {
    const paralleUploadS3 = new Upload({
      client: this.s3Client,
      params: {
        Bucket: this.bucket,
        Key: filename,
        Body: fs.readFileSync(filePath),
        ContentType: contentType as string,
      },
    });
    return paralleUploadS3.done();
  }
}
