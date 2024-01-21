/* eslint-disable camelcase */
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { RedisService } from '@social/common/redis/redis.service';
import { Server } from 'socket.io';
import { UserOnline } from '../serializations/user.online.socket';

@WebSocketGateway({})
export class TimelineGateWay {
  constructor(private readonly redisService: RedisService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('caching-user_online')
  async CachingUserOnine(@MessageBody() online: UserOnline) {
    await this.redisService.set(
      `${online.data.id}:"userOnline"`,
      online.data.id_user_name,
    );
  }
}
