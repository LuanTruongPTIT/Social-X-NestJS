import { Global, Module } from '@nestjs/common';
import { HelperDateService } from './services/helper.date.service';
import { HelperStringService } from './services/helper.string.service';
import { HelperFileVideoService } from './services/helper.file-video.service';
import { HelperFileService } from './services/helper.file.service';

@Global()
@Module({
  providers: [
    HelperDateService,
    HelperStringService,
    HelperFileVideoService,
    HelperFileService,
  ],
  exports: [
    HelperDateService,
    HelperStringService,
    HelperFileVideoService,
    HelperFileService,
  ],
  controllers: [],
  imports: [],
})
export class HelperModule {}
