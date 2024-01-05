import { Module } from '@nestjs/common';
import { FileModule } from '@social/modules/file/file.module';

@Module({
  imports: [FileModule],
})
export class RoutesFileModule {}
