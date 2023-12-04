/* eslint-disable @typescript-eslint/no-explicit-any */
import { registerAs } from '@nestjs/config';

export default registerAs(
  'aws',
  (): Record<string, any> => ({
    cognito: {
      userPoolId: process.env.USER_POOL_ID,
      clientId: process.env.CLIENT_ID,
    },
  }),
);
