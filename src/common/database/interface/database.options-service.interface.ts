import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

export interface IDatabaseOptionsService {
  createOptions(): Promise<DataSourceOptions & TypeOrmModuleOptions>;
}
