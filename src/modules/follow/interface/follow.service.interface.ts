import { FollowEntity } from '@social/common/database/entities/follow.entity';

export interface IFollowService {
  CreateFollow: (follower: string, followee: string) => Promise<void>;
  areUsersFollowingEachOther: (
    follower: string,
    followee: string,
  ) => Promise<FollowEntity>;
}
