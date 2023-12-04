import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
@Injectable()
export class AwsCognitoService {
  private userPool: CognitoUserPool;
  constructor(private readonly configService: ConfigService) {
    this.userPool = new CognitoUserPool({
      ClientId: this.configService.get<string>('aws.cognito.clientId'),
      UserPoolId: this.configService.get<string>('aws.cognito.userPoolId'),
    });
  }

  async signUp({ email, password }: { email: string; password: string }) {
    console.log(email, password);
    this.userPool.signUp(
      email,
      password,
      [
        new CognitoUserAttribute({
          Name: 'name',
          Value: '',
        }),
      ],
      null,
      (err, result) => {
        if (!result) {
          console.log('Error', err);
        } else {
          console.log('result', result);
        }
      },
    );
  }
}
