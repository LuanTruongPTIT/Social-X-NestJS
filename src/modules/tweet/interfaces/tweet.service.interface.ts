/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ITweetService {
  findOrCreateHashtag: (name: Array<any>) => Promise<any>;
}
