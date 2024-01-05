import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CognitoUserAttribute,
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
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
    return new Promise((resolve, reject) => {
      return this.userPool.signUp(
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
          if (err) {
            // console.log('Error', JSON.stringify(err));
            // throw new BadRequestException('loi roi');
            reject(err);
          } else {
            resolve(result);
          }
        },
      );
    });
  }

  async SignIn({ email, password }: { email: string; password: string }) {
    const userData = {
      Username: email,
      Pool: this.userPool,
    };
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });
    const userCognito = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      userCognito.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve({
            accessToken: result.getAccessToken().getJwtToken(),
            refreshToken: result.getAccessToken().getJwtToken(),
          });
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  async GetUser() {}
}
