/* eslint-disable @typescript-eslint/no-explicit-any */
import { registerAs } from '@nestjs/config';
import { ENUM_APP_ENVIRONMENT } from '@social/app/constants/app.enum.constant';

export default registerAs(
  'tweet',
  (): Record<string, any> => ({
    uploadPath:
      process.env.NODE_ENV === ENUM_APP_ENVIRONMENT.PRODUCTION
        ? '/tweet'
        : '/test/tweet',
  }),
);
