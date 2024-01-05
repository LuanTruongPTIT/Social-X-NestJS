import fsPromise from 'fs/promises';
import { Injectable } from '@nestjs/common';
import path from 'path';
import fs from 'fs';
@Injectable()
export class HelperFileService {
  CreateFolder(folderDir: string, field: string): void {
    const folderPath = path.resolve(folderDir, field);
    fs.mkdirSync(folderPath);
  }

  GetAddressDirectory(folderDir: string, field?: string) {
    return field ? path.resolve(folderDir, field) : path.resolve(folderDir);
  }

  JoinWithFile(filePath: string, fileName: string) {
    return path.join(filePath, fileName);
  }

  MoveFile(sourceFilePath: string, destinationFilePath: string) {
    return fs.renameSync(sourceFilePath, destinationFilePath);
  }

  DeleteFile(filePath: string) {
    return fsPromise.unlink(filePath);
  }

  GetFile(dir: string, files: string[] = []) {
    // files = [];Parameter cannot have question mark and
    const fileList = fs.readdirSync(dir);
    for (const file of fileList) {
      const name = `${dir}/${file}`;
      if (fs.statSync(name).isDirectory()) {
        this.GetFile(name, files);
      } else {
        console.log(name);
        files.push(name);
      }
    }
    return files;
  }
}
