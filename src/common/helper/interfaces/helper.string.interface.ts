import { IHelperStringRandomOptions } from 'src/common/helper/interfaces/helper.interface';

export interface IHelperStringService {
  random(length: number, options?: IHelperStringRandomOptions): string;
}
