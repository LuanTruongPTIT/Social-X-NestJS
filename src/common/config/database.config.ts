/* eslint-disable @typescript-eslint/no-explicit-any */
import { registerAs } from '@nestjs/config';

export default registerAs(
  'database',
  (): Record<string, any> => ({
    DB_PORT: process.env.DATABASE_PORT,
    DB_HOST_MASTER: process.env.DATABASE_HOST_MASTER,
    DB_HOST_SLAVE: process.env.DATABASE_HOST_SLAVE,
    DB_USER_MASTER: process.env.DATABASE_USER_MASTER,
    DB_USER_SLAVE: process.env.DATABASE_USER_MASTER,
    DB_PASSWORD_MASTER: process.env.DATABASE_PASSWORD_MASTER,
    DB_PASSWORD_SLAVE: process.env.DATABASE_PASSWORD_SLAVE,
    DB_NAME: process.env.DB_DATABASE,
    DB_SYNC: process.env.DATABASE_SYNCHRONIZE,
    DB_MAX_CONNECTION: process.env.DATABASE_MAX_CONNECTION,
  }),
);
