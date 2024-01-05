/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatus } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
// import { IMessageOptionsProperties } from 'src/common/message/interfaces/message.interface';

export interface IResponseCustomPropertyMetadata {
  statusCode?: number;
  message?: string;
  httpStatus?: HttpStatus;
  // messageProperties?: IMessageOptionsProperties;
}

// metadata
export interface IResponseMetadata {
  customProperty?: IResponseCustomPropertyMetadata;
  [key: string]: any;
}

// decorator options

export interface IResponseOptions<T> {
  serialization?: ClassConstructor<T>;
  // messageProperties?: IMessageOptionsProperties;
}

// type
export interface IResponse {
  _metadata?: IResponseMetadata;
  data?: Record<string, any>;
}
