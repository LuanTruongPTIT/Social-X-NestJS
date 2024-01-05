/* eslint-disable camelcase */
import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import path from 'path';

@Injectable()
export class HelperFileVideoService {
  private readonly MAXIMUM_BITRATE_720P: number;
  private readonly MAXIMUM_BITRATE_1080P: number;
  private readonly MAXIMUM_BITRATE_1440P: number;

  constructor() {
    this.MAXIMUM_BITRATE_720P = 5 * 10 ** 6;
    this.MAXIMUM_BITRATE_1080P = 8 * 10 ** 6;
    this.MAXIMUM_BITRATE_1440P = 16 * 10 ** 6;
  }

  async encodeHLSWithMultipleVideoStreams(inputPath: string) {
    const [bitrate, resolution] = await Promise.all([
      this.getBitrate(inputPath),
      this.getResolution(inputPath),
    ]);
    const parent_folder = path.join(inputPath, '..');
    const outputSegmentPath = path.join(parent_folder, 'v%v/fileSequence%d.ts');
    const outputPath = path.join(parent_folder, 'v%v/prog_index.m3u8');
    const bitrate720 =
      bitrate > this.MAXIMUM_BITRATE_720P ? this.MAXIMUM_BITRATE_720P : bitrate;
    const bitrate1080 =
      bitrate > this.MAXIMUM_BITRATE_1080P
        ? this.MAXIMUM_BITRATE_1080P
        : bitrate;
    const bitrate1440 =
      bitrate > this.MAXIMUM_BITRATE_1440P
        ? this.MAXIMUM_BITRATE_1440P
        : bitrate;

    const argsWithMax720 = [
      '-y',
      '-i',
      inputPath,
      '-preset',
      'veryslow',
      '-g',
      '48',
      '-crf',
      '17',
      '-sc_threshold',
      '0',
      '-map',
      '0:0',
      '-map',
      '0:1',
      '-s:v:0',
      `${this.getWidth(720, resolution)}x720`,
      '-c:v:0',
      'libx264',
      '-b:v:0',
      bitrate720,
      '-c:a',
      'copy',
      '-var_stream_map',
      'v:0,a:0',
      '-master_pl_name',
      'master.m3u8',
      '-f',
      'hls',
      '-hls_time',
      '6',
      '-hls_list_size',
      '0',
      '-hls_segment_filename',
      outputSegmentPath,
      outputPath,
    ];
    // this.logger.log('function argsWithMax720 success');
    const argsWithMax1080 = [
      '-y',
      '-i',
      inputPath,
      '-preset',
      'veryslow',
      '-g',
      '48',
      '-crf',
      '17',
      '-sc_threshold',
      '0',
      '-map',
      '0:0',
      '-map',
      '0:1',
      '-map',
      '0:0',
      '-map',
      '0:1',
      '-s:v:0',
      `${this.getWidth(720, resolution)}x720`,
      '-c:v:0',
      'libx264',
      '-b:v:0',
      bitrate720,
      '-s:v:1',
      `${this.getWidth(1080, resolution)}x1080`,
      '-c:v:1',
      'libx264',
      '-b:v:1',
      bitrate1080,
      '-c:a',
      'copy',
      '-var_stream_map',
      'v:0,a:0 v:1,a:1',
      '-master_pl_name',
      'master.m3u8',
      '-f',
      'hls',
      '-hls_time',
      '6',
      '-hls_list_size',
      '0',
      '-hls_segment_filename',
      outputSegmentPath,
      outputPath,
    ];
    // this.logger.log('function argsWithMax1080 success');
    const argsWithMax1440 = [
      '-y',
      '-i',
      inputPath,
      '-preset',
      'veryslow',
      '-g',
      '48',
      '-crf',
      '17',
      '-sc_threshold',
      '0',
      '-map',
      '0:0',
      '-map',
      '0:1',
      '-map',
      '0:0',
      '-map',
      '0:1',
      '-map',
      '0:0',
      '-map',
      '0:1',
      '-s:v:0',
      `${this.getWidth(720, resolution)}x720`,
      '-c:v:0',
      'libx264',
      '-b:v:0',
      bitrate720,
      '-s:v:1',
      `${this.getWidth(1080, resolution)}x1080`,
      '-c:v:1',
      'libx264',
      '-b:v:1',
      bitrate1080,
      '-s:v:2',
      `${this.getWidth(1440, resolution)}x1440`,
      '-c:v:2',
      'libx264',
      '-b:v:2',
      bitrate1440,
      '-c:a',
      'copy',
      '-var_stream_map',
      'v:0,a:0 v:1,a:1 v:2,a:2',
      '-master_pl_name',
      'master.m3u8',
      '-f',
      'hls',
      '-hls_time',
      '6',
      '-hls_list_size',
      '0',
      '-hls_segment_filename',
      outputSegmentPath,
      outputPath,
    ];

    const argsWithOriginalWidth = [
      '-y',
      '-i',
      inputPath,
      '-preset',
      'veryslow',
      '-g',
      '48',
      '-crf',
      '17',
      '-sc_threshold',
      '0',
      '-map',
      '0:0',
      '-map',
      '0:1',
      '-map',
      '0:0',
      '-map',
      '0:1',
      '-map',
      '0:0',
      '-map',
      '0:1',
      '-s:v:0',
      `${this.getWidth(720, resolution)}x720`,
      '-c:v:0',
      'libx264',
      '-b:v:0',
      bitrate720,
      '-s:v:1',
      `${this.getWidth(1080, resolution)}x1080`,
      '-c:v:1',
      'libx264',
      '-b:v:1',
      bitrate1080,
      '-c:v:2',
      'libx264',
      '-b:v:2',
      bitrate,
      '-c:a',
      'copy',
      '-var_stream_map',
      'v:0,a:0 v:1,a:1 v:2,a:2',
      '-master_pl_name',
      'master.m3u8',
      '-f',
      'hls',
      '-hls_time',
      '6',
      '-hls_list_size',
      '0',
      '-hls_segment_filename',
      outputSegmentPath,
      outputPath,
    ];

    let args = argsWithMax720;
    if (resolution.height > 720) {
      args = argsWithMax1080;
    }
    if (resolution.height > 1080) {
      args = argsWithMax1440;
    }
    if (resolution.height > 1440) {
      args = argsWithOriginalWidth;
    }

    await this.runCommandWithProgress('ffmpeg', args as string[]);
    console.log('Convert thành công');
  }

  runCommandWithImmediateOutput(command: string, arg: string[]) {
    return new Promise<string>((resolve, reject) => {
      const childProcess = spawn(command, arg);
      childProcess.stdout.on('data', (data) => {
        resolve(String(data).trim());
      });
      childProcess.on('close', (code) => {
        if (code !== 0) {
          reject(new Error('Command failed'));
        }
      });
    });
  }

  runCommandWithProgress(command: string, arg: string[]) {
    return new Promise<true>((resolve, reject) => {
      const childProcess = spawn(command, arg);
      childProcess.on('close', (code) => {
        if (code === 0) {
          resolve(true);
        } else {
          reject(new Error('Command failed'));
        }
      });
    });
  }

  async getBitrate(filePath: string) {
    const value = await this.runCommandWithImmediateOutput('ffprobe', [
      '-v',
      'error',
      '-select_streams',
      'v:0',
      '-show_entries',
      'stream=bit_rate',
      '-of',
      'default=nw=1:nk=1',
      filePath,
    ]);
    return Number(value);
  }

  async getResolution(filePath: string) {
    const value = await this.runCommandWithImmediateOutput('ffprobe', [
      '-v',
      'error',
      '-select_streams',
      'v:0',
      '-show_entries',
      'stream=width,height',
      '-of',
      'csv=s=x:p=0',
      filePath,
    ]);
    const resolution = value.split('x');
    const [width, height] = resolution;
    return {
      width: Number(width),
      height: Number(height),
    };
  }

  getWidth(height: number, resolution: { width: number; height: number }) {
    const width = Math.round((height * resolution.width) / resolution.height);
    // Vì ffmpeg yêu cầu width và height phải là số chẵn
    return width % 2 === 0 ? width : width + 1;
  }
}
