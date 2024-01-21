/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(
    @Inject('caching-redis')
    private readonly redis: Redis,
  ) {}

  async hset(key: string, data: any, ttl: number) {
    await this.redis.hset(key, data, ttl);
  }

  async zadd(key: string, score: any, ttl: number) {
    // await this.redis.zadd();
    // this.redis.expire(key, );
  }

  async set(key: string, data: any, ttl?: number) {
    await this.redis.set(key, data);
  }
}
