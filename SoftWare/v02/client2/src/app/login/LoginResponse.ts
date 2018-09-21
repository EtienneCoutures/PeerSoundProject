import { Account } from '../account';

export class loginResponse {
  code: number;
  errors: {message: string[]};
  info: {message: string};
  account: Account;
}
