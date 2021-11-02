import { User } from '../user/user';

export class BankAccount {
  id?: string | undefined;
  user?: User;
  bic: string;
  iban: string;
  account_name: string;
}
