// /* eslint-disable no-undef-init */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import {
//   ArgumentsHost,
//   Catch,
//   ExceptionFilter,
//   HttpException,
//   HttpStatus,
// } from '@nestjs/common';
// import { HttpArgumentsHost } from '@nestjs/common/interfaces';
// import { ConfigService } from '@nestjs/config';
// import { IRequestApp } from '@social/common/request/interfaces/request.interface';
// import { Response } from 'express';
// import { v1 } from 'uuid';
// import {
//   IErrorException,
//   IErrors,
//   IErrorsImport,
// } from '../interfaces/error.interface';
// import { ErrorMetadataSerialization } from '../serialization/error.serialization';
// import { HelperDateService } from '@social/common/helper/services/helper.date.service';

// @Catch()
// export class ErrorHttpFilter implements ExceptionFilter {
//   constructor(
//     private readonly configService: ConfigService,
//     private readonly helperDateService: HelperDateService,
//   ) {}

//   async catch(exception: any, host: ArgumentsHost) {
//     const ctx: HttpArgumentsHost = host.switchToHttp();
//     const response: Response = ctx.getResponse<Response>();
//     const request: IRequestApp = ctx.getRequest<IRequestApp>();

//     const __customLang: string[] = request.__customLang ?? ['en'];
//     const __class = request.__class ?? ErrorHttpFilter.name;
//     const __function = request.__function ?? this.catch.name;
//     const __requestId = request.__id ?? v1();
//     const __path = request.path;
//     const __timestamp =
//       request.__xTimestamp ??
//       request.__timestamp ??
//       this.helperDateService.timestamp();
//     const __timezone =
//       request.__timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone;
//     const __version =
//       request.__version ??
//       this.configService.get<string>('app.versioning.version');

//     let statusHttp: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
//     let messagePath = `http.${statusHttp}`;
//     let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
//     let _error: string = undefined;
//     // let errors: IErrors[] | IErrorsImport[] = undefined;
//     // let messageProperties: IMessageOptionsProperties = undefined;
//     let data: Record<string, any> = undefined;
//     let metadata: ErrorMetadataSerialization = {
//       languages: __customLang,
//       timestamp: __timestamp,
//       timezone: __timezone,
//       requestId: __requestId,
//       path: __path,
//       version: __version,
//     };

//     if (exception instanceof HttpException) {
//       const responseException = exception.getResponse();
//       statusHttp = exception.getStatus();
//       messagePath = `http.${statusHttp}`;
//       statusCode = exception.getStatus();
//       console.log('responseException', responseException);
//       if (this.isErrorException(responseException)) {
//         const { _metadata } = responseException;
//         console.log(_metadata);
//         statusCode = responseException.statusCode;
//         messagePath = responseException.message;
//         data = responseException.data;
//         // messageProperties = _metadata?.customProperty?.messageProperties;
//         delete _metadata?.customProperty;

//         metadata = {
//           ...metadata,
//           ..._metadata,
//         };
//         if (!responseException._error) {
//           _error =
//             typeof responseException._error !== 'string'
//               ? JSON.stringify(responseException._error)
//               : responseException._error;
//         }
//       }
//     }
//     // } else {
//     //   // console.log('exception', JSON.stringify(exception));
//     //   // exception = exception as any;
//     //   if (exception.code === 'UsernameExistsException') {
//     //     console.log('UsernameExistsException');
//     //   }
//     // }

//     const responseBody = {
//       statusCode,
//       // message,
//       message: exception.message,
//       // errors,
//       error: exception.code,
//       _error,
//       _metadata: metadata,
//       data,
//     };
//     response
//       .setHeader('x-custom-lang', __customLang)
//       .setHeader('x-timestamp', __timestamp)
//       .setHeader('x-timezone', __timezone)
//       .setHeader('x-request-id', __requestId)
//       .setHeader('x-version', __version)
//       .status(statusHttp)
//       .json(responseBody);
//   }

//   isErrorException(obj: any): obj is IErrorException {
//     return typeof obj === 'object'
//       ? 'statusCode' in obj && 'message' in obj
//       : false;
//   }
// }
