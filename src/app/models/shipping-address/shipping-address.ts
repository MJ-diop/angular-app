import { Address } from '../address/address';
import { User } from '../user/user';

export type ShippingAddress = {
  id?: string | undefined;
  company?: string | undefined;
  name: string;
  state: string;
  street1: string;
  city: string;
  zip_code: string;
  country: string;
  phone: string;
  email: string;
};
