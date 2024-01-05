/* eslint-disable @typescript-eslint/no-var-requires */
import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

export function FileUploadSingle(field?: string): MethodDecorator {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor(field ?? 'file', {
        storage: diskStorage({
          destination: './uploads/tweet',
          filename: (req, file, cb) => {
            cb(null, `${file.originalname}`);
          },
        }),
      }),
    ),
  );
}
