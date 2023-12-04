import { Module } from '@nestjs/common';
import { DatabaseOptionService } from './service/database.options.service';

@Module({
  providers: [DatabaseOptionService],
  exports: [DatabaseOptionService],
  imports: [],
  controllers: [],
})
export class DatabaseOptionModule {}
