/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseEntity, Repository } from 'typeorm';
import { BaseInterfaceRepository } from '~@common/database/interface/base.interface.repository';

export abstract class BaseAbastractRepository<T extends BaseEntity>
  implements BaseInterfaceRepository<T>
{
  constructor(private readonly repository: Repository<T>) {}

  public async create(data: T | any): Promise<T> {
    return this.repository.save(data);
  }

  public async exist(data: any): Promise<void> {
    const result = await this.repository.exist();
  }

  public async findByField(data: Record<string, any>): Promise<T> {
    return await this.repository.findOne({ where: data });
  }
}
