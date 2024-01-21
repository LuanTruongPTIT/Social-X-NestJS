/* eslint-disable camelcase */
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FollowUserDto } from '../dtos/follow.user.dto';
import { FollowService } from '../services/follow.service';

@ApiTags('modules.follow')
@Controller({
  version: '1',
  path: '/follow',
})
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post('/follow-user')
  async FollowUser(@Body() data: FollowUserDto) {
    const { userid_follower, userid_followee } = data;
    const followExist = await this.followService.areUsersFollowingEachOther(
      userid_follower,
      userid_followee,
    );
    if (followExist) {
      throw new BadRequestException({
        message: 'Two user follow each other',
      });
    }
    await this.followService.CreateFollow(userid_follower, userid_followee);
    return {
      statusCode: 200,
      message: 'follow success',
    };
  }
}
