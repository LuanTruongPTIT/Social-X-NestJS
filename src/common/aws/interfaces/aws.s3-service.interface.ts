/* eslint-disable @typescript-eslint/no-explicit-any */
import { Readable } from 'stream';
import { AwsS3Serialization } from '../serializations/aws.s3.serialization';
import { IAwsS3PutItemOptions } from './aws.interface';

export interface IAwsS3Service {
  putItemVideoInBucket(
    filename: string,
    filePath: string,
    content: string,
    options?: IAwsS3PutItemOptions,
  ): any;
}
