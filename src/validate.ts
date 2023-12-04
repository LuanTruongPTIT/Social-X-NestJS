/* istanbul ignore file */
import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, validateSync } from 'class-validator';

import dotenv from 'dotenv';

export const envPath = '../env';
console.log(envPath);
dotenv.config({ path: envPath });

export class EnvironmentVariables {
  @IsNotEmpty()
  DATABASE_PORT: number;

  @IsNotEmpty()
  DATABASE_SYNCHRONIZE: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
