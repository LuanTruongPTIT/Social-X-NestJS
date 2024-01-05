/* eslint-disable @typescript-eslint/no-explicit-any */
import { registerAs } from '@nestjs/config';

export default registerAs(
  'app',
  (): Record<string, any> => ({
    maintenance: process.env.APP_MAINTENANCE === 'true' ?? false,
    name: process.env.APP_NAME ?? 'twitter',
    env: process.env.APP_ENV ?? 'development',
    versioning: {
      enable: process.env.HTTP_VERSIONING_ENABLE ?? 'true',
      prefix: 'v',
      version: process.env.HTTP_VERSION ?? '1',
    },
    globalPrefix: '/api',

    http: {
      enable: process.env.HTTP_ENABLE === 'true' ?? false,
      host: process.env.HTTP_HOST ?? 'localhost',
      port: process.env.HTTP_PORT
        ? Number.parseInt(process.env.HTTP_PORT)
        : 4000,
    },
  }),
);
