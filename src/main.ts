import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { ConfigService } from '@nestjs/config';
import { INestApplication, VersioningType } from '@nestjs/common';
import swaggerInit from './swagger';
import { RedisIoAdapter } from './common/socket/redis.adapter';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableCors({
    origin: 'http://localhost:5173',
  });
  // app.useStaticAssets(join(__dirname, '..', 'uploads/video'));
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
  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();

  app.useWebSocketAdapter(redisIoAdapter);
  await app.listen(port);
}
bootstrap();
