/* eslint-disable @typescript-eslint/naming-convention */
import { AccountType } from '../../enums/account-type.enum';
import { Gender } from '../../enums/gender.enum';
import { Address } from '../address/address';

export type User = {
  email: string;
  username: string;
  fullname: string;
  account_type: string;
  // account_type: AccountType;
  gender: string;
  // gender: Gender;
  address: Address;
  password: string;
};
