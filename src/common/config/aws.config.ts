/* eslint-disable @typescript-eslint/no-explicit-any */
import { registerAs } from '@nestjs/config';

export default registerAs(
  'aws',
  (): Record<string, any> => ({
    cognito: {
      userPoolId: process.env.USER_POOL_ID,
      clientId: process.env.CLIENT_ID,
      authority: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.USER_POOL_ID}`,
    },
    s3: {
      credential: {
        key: process.env.ACCESS_KEY,
        secret: process.env.SECRET_ACCESS_KEY,
      },
      bucket: process.env.AWS_S3_BUCKET,
      region: process.env.AWS_S3_REGION,
      baseUrl: `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_S3_REGION}.amazonaws.com`,
    },
  }),
);
