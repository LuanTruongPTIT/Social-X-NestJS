import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './config//index';
import Joi from 'joi';
import { DatabaseOptionService } from './database/service/database.options.service';
import { validate } from '../validate';
import { DatabaseOptionModule } from './database/database.options.module';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AwsModule } from './aws/aws.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: config,
      isGlobal: true,
      envFilePath: ['.env'],
      expandVariables: true,
      // validate,
      // validationSchema: Joi.object({
      //   DATABASE_NAME: Joi.string().default('twitter').required,
      //   DATABASE_USER: Joi.string().required(),
      //   DATABASE_PASSWORD: Joi.string().required(),
      //   DATABASE_PORT: Joi.number().required(),
      // }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [DatabaseOptionModule],
      inject: [DatabaseOptionService],
      useFactory: (databaseOptionService: DatabaseOptionService) =>
        databaseOptionService.createOptions(),
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
  ],
})
export class CommonModule {
  constructor(private readonly configService: ConfigService) {
    this.test();
  }

  test() {
    const port = console.log(
      this.configService.get<string>('aws.coginto.userPoolId'),
    );

    console.log(port);
  }
}
