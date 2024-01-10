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
import { ErrorModule } from './error/error.module';
import { HelperModule } from './helper/helper.module';
import { HashtagRepositoryModule } from './database/repository/hashtag.repository.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: config,
      isGlobal: true,
      envFilePath: ['.env'],
      expandVariables: true,
      validate,
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
    HashtagRepositoryModule,
    // ErrorModule,
    HelperModule,
  ],
})
export class CommonModule {}
