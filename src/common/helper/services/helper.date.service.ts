import { Injectable } from '@nestjs/common';
import { IHelperDateService } from '../interfaces/helper.date-service.interface';
import { IHelperDateOptionsCreate } from '../interfaces/helper.interface';
import moment from 'moment';

@Injectable()
export class HelperDateService implements IHelperDateService {
  timestamp(
    date?: string | number | Date,
    options?: IHelperDateOptionsCreate,
  ): number {
    const mDate = moment(date ?? undefined);

    if (options?.startOfDay) {
      mDate.startOf('day');
    }

    return mDate.valueOf();
  }
}
