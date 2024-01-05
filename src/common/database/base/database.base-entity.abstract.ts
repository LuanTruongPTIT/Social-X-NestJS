/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DatabaseEntityAbstract<T = any> {
  id: T;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
