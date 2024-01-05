import { IHelperDateOptionsCreate } from './helper.interface';

export interface IHelperDateService {
  timestamp(
    date?: string | number | Date,
    options?: IHelperDateOptionsCreate,
  ): number;
}
