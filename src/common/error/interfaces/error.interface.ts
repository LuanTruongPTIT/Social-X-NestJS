/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValidationError } from 'class-validator';
import { ERROR_TYPE } from '../constants/error.enum.constant';
import { IResponseCustomPropertyMetadata } from '@social/common/response/interfaces/response.interface';

export interface IErrors {
  readonly message: string;
  readonly property: string;
}
export interface IErrorsImport {
  row: number;
  file?: string;
  sheet?: number;
  errors: IErrors[];
}
export interface IErrorException {
  statusCode: number;
  message: string;
  errors?: ValidationError[] | IValidationErrorImport[];
  data?: Record<string, any>;
  _error?: string;
  _errorType?: ERROR_TYPE;
  _metadata?: IErrorMetadata;
}
export interface IErrorMetadata {
  customProperty?: IErrorCustomPropertyMetadata;
  [key: string]: any;
}
export type IErrorCustomPropertyMetadata = IResponseCustomPropertyMetadata;
export interface IValidationErrorImport extends Omit<IErrorsImport, 'errors'> {
  errors: ValidationError[];
}
