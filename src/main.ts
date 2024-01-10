import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';
import swaggerInit from './swagger';
import { join } from 'path';
async function bootstrap() {
  const app: NestApplication = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  // app.enableCors({
  //   origin: 'http://localhost:5173',
  // });
  app.useStaticAssets(join(__dirname, '..', 'uploads/video'));
  const configService = app.get(ConfigService);
  const version = configService.get<string>('app.versioning.version');
  const versionEnable = configService.get<string>('app.versioning.enable');
  const globalPrefix = configService.get<string>('app.globalPrefix');
  const versioningPrefix = configService.get<string>('app.versioning.prefix');
  const port = configService.get<number>('app.http.port');
  app.setGlobalPrefix(globalPrefix);
  if (versionEnable) {
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: version,
      prefix: versioningPrefix,
    });
  }
  await swaggerInit(app);
  await app.listen(port);
}
bootstrap();
