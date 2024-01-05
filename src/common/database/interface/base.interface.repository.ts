/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BaseInterfaceRepository<T> {
  create(data: T | any): Promise<T>;
  exist(data: any): Promise<void>;
  findByField(data: Record<string, any>): Promise<T>;
}
