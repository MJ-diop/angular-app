/* eslint-disable @typescript-eslint/naming-convention */

import { AccountType } from '../../enums/account-type.enum';
import { Gender } from '../../enums/gender.enum';
import { Address } from '../address/address';

export type Token = {
  refresh: string;
  access: string;
};

export type Auth = {
  email: string;
  password: string;
};

export type AuthResponded = {
  id: string;
  email: string;
  username: string;
  fullname: string;
  token: string;
  account_type: AccountType;
  gender: Gender;
  address: Address;
};

export type RegisterResponded = {
  email: string;
  username: string;
  fullname: string;
  token: string;
  is_verified: boolean;
  account_type: AccountType;
  gender: Gender;
  address: Address;
  tokens: Token;
};
