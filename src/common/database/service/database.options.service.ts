import { DataSourceOptions } from 'typeorm';
import { IDatabaseOptionsService } from '../interface/database.options-service.interface';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseOptionService implements IDatabaseOptionsService {
  constructor(private readonly configService?: ConfigService) {}

  async createOptions(): Promise<DataSourceOptions & TypeOrmModuleOptions> {
    const typeormConfig: DataSourceOptions & TypeOrmModuleOptions = {
      entities: [__dirname + '/../../entities/*(.ts,.js)'],
      migrations: [__dirname + '/../../migrations/*(.ts,.js)'],
      type: 'postgres',
      synchronize: true,
      keepConnectionAlive: true,
      logging: false,
      autoLoadEntities: true,
      extra: {
        max: this.configService.get<number>('database.DB_MAX_CONNECTION'),
      },
      // replication: {
      //   master: {
      host: this.configService.get<string>('database.DB_HOST_MASTER'),
      port: this.configService.get<number>('database.DB_PORT'),
      username: this.configService.get<string>('database.DB_USER_MASTER'),
      password: this.configService.get<string>('database.DB_PASSWORD_MASTER'),
      database: this.configService.get<string>('database.DB_NAME'),
      // },

      // slaves: [
      //   {
      //     host: 'localhost',
      //     port: this.configService.get<number>('database.DB_PORT'),
      //     username: this.configService.get<string>('database.DB_USER_SLAVE'),
      //     password: this.configService.get<string>(
      //       'database.DB_PASSWORD_SLAVE',
      //     ),
      //     database: this.configService.get<string>(
      //       'database.DB_DATABASE_NAME',
      //     ),
      //   },
      // ],
      // },
    };

    return typeormConfig;
  }
}
