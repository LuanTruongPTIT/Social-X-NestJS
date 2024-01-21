import { Global, Module, Provider } from '@nestjs/common';
import { RedisService } from './redis.service';
import Redis from 'ioredis';
export type RedisClient = Redis;
export const redisProvider: Provider = {
  useFactory: (): RedisClient => {
    return new Redis({
      host: 'localhost',
      port: 6379,
    });
  },
  provide: 'caching-redis',
};
@Global()
@Module({
  controllers: [],
  providers: [RedisService, redisProvider],
  imports: [],
  exports: [RedisService],
})
export class RedisModule {}
