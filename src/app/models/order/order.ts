import { CartModelServer } from '../cart/cart';
import { ShippingAddress } from '../shipping-address/shipping-address';
import { ShippingMethod } from '../shipping-method/shipping-method';
import { User } from '../user/user';

export type OrderResponded = {
  number: String;
  cart: String;
  user: User;
  currency: String;
  total_tax: String;
  shipping_tax: String;
  total_prices: String;
  shipping_address: ShippingAddress;
  shipping_method: ShippingMethod;
};
export type Order = {
  cart: String;
  currency: String;
  total_tax: String;
  shipping_tax: String;
  total_prices: String;
  shipping_address: ShippingAddress;
  shipping_method: ShippingMethod;
};
