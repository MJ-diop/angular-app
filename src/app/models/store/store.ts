/* eslint-disable @typescript-eslint/naming-convention */
import { Address } from '../address/address';

export class Store {
  name: string;
  created_by: number;
  address: Address;
  is_active: boolean;
  region: string;
  // products: any;
  image: string;
}
