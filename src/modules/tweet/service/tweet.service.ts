/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITweetService } from '../interfaces/tweet.service.interface';
import { HashTagsRepository } from '@social/common/database/repository/hashtag.repostiory';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TweetService implements ITweetService {
  constructor(private readonly hashTagRepository: HashTagsRepository) {}

  async findOrCreateHashtag(name: Array<any>): Promise<any> {
    const listIdHashTag = [];
    await Promise.all(
      name.map(async (item) => {
        const result = await this.hashTagRepository.findByField({ name: item });
        if (result) {
          listIdHashTag.push(result.id);
        } else {
          const hashtag = await this.hashTagRepository.create({ name: item });
          listIdHashTag.push(hashtag.id);
        }
        return listIdHashTag;
      }),
    );
    return listIdHashTag;
  }
}
