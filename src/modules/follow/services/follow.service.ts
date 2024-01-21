import { IFollowService } from '../interface/follow.service.interface';
import { Injectable } from '@nestjs/common';
import { FollowRepository } from '../repository/follow.repository';
import { FollowEntity } from '@social/common/database/entities/follow.entity';
import { UserRepository } from '@social/modules/user/repository/user.repository';

@Injectable()
export class FollowService implements IFollowService {
  constructor(
    private readonly followRepo: FollowRepository,
    private readonly userRepo: UserRepository,
  ) {}

  async CreateFollow(follower: string, followee: string): Promise<void> {
    await this.followRepo.create({
      userIdFollower: follower,
      userIdFollowee: followee,
    });

    Promise.all([
      await this.userRepo.increment({ id: follower }, 'follower_count', 1),
      await this.userRepo.increment({ id: followee }, 'following_count', 1),
    ]);
  }

  async areUsersFollowingEachOther(
    follower: string,
    followee: string,
  ): Promise<FollowEntity> {
    return this.followRepo.findByField({
      userIdFollower: follower,
      userIdFollowee: followee,
    });
  }
}
