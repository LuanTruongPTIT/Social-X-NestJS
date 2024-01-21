import { AwsS3Service } from '~@common/aws/services/aws.s3.service';
import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
} from '@nestjs/common';
import { IFile } from '../interfaces/file.interface';
import { FileUploadSingle } from '../decorator/file.decorator';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileSingleDto } from '../dto/file.single.dto';
import { FileService } from '../services/file.service';
import { AwsS3Serialization } from '@social/common/aws/serializations/aws.s3.serialization';
import { HelperFileVideoService } from '@social/common/helper/services/helper.file-video.service';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import path, { join } from 'path';
import { UPLOAD_VIDEO_DIR, UPLOAD_VIDEO_TWEET } from '../constants/dir';
import fs from 'fs';
import { nanoid } from 'nanoid';
import fsPromise from 'fs/promises';
import { HelperFileService } from '@social/common/helper/services/helper.file.service';
import { HelperStringService } from '@social/common/helper/services/helper.string.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@ApiTags('modules.file')
@Controller({
  path: '/file',
  version: '1',
})
export class FileController {
  private readonly baseurl: string;
  constructor(
    private readonly fileService: FileService,
    private readonly awsS3Service: AwsS3Service,
    private readonly helperFileVideoService: HelperFileVideoService,
    private readonly helperFileService: HelperFileService,
    private readonly helperStringService: HelperStringService,
    private readonly configService: ConfigService,
    @InjectQueue('encode:video')
    private readonly encodeVideo: Queue,
  ) {
    this.baseurl = this.configService.get<string>('aws.s3.baseUrl');
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileSingleDto })
  @FileUploadSingle()
  @Post('/upload/video')
  async UploadFileVideo(@UploadedFile() file: IFile) {
    const fileName = file.originalname;
    console.log(file);

    const idName = this.helperStringService.randomNanoId();
    this.helperFileService.CreateFolder(UPLOAD_VIDEO_DIR, idName);
    const sourceDirectory =
      this.helperFileService.GetAddressDirectory(UPLOAD_VIDEO_TWEET);
    const destinationDirectory = this.helperFileService.GetAddressDirectory(
      UPLOAD_VIDEO_DIR,
      idName,
    );
    const sourceFilePath = this.helperFileService.JoinWithFile(
      sourceDirectory,
      fileName,
    );
    const destinationFilePath = this.helperFileService.JoinWithFile(
      destinationDirectory,
      fileName,
    );
    const data = {
      destinationDirectory,
      idName,
      fileName,
    };

    this.helperFileService.MoveFile(sourceFilePath, destinationFilePath);
    await this.encodeVideo.add('encode-video-hls', data);
    return this.baseurl + '/video-hls' + '/' + idName + '/' + 'master.m3u8';
  }

  @Get('/video-hls/:id/master.m3u8')
  async serveM3u8(@Param('id') id: string, @Res() res: Response) {
    // const videoPath = join(__dirname, '..', 'uploads/video', id, 'master.m3u8');
    const videoPath = path.resolve(UPLOAD_VIDEO_DIR, id, 'master.m3u8');
    console.log(videoPath);
    res.sendFile(videoPath);
    // console.log(videoPath);
  }

  @Get('/video-hls/:id/:v/:segment')
  async ServeSegmentController(
    @Param('id') id: string,
    @Param('v') v: string,
    @Param('segment') segment: string,
    @Res() res: Response,
  ) {
    const videoPath = path.resolve(UPLOAD_VIDEO_DIR, id, v, segment);
    console.log(videoPath);
    res.sendFile(videoPath);
  }

  @Post('')
  async testHLS() {}
}
