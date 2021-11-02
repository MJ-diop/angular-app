import { User } from '../user/user';

export class CreditCard {
  id?: string | undefined;
  card_number: Number;
  card_name: string;
  cvc: string;
  expiration_date: string;
  user: User;
}
