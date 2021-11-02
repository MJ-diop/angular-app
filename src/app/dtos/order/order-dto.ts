import { ShippingAddress } from "./shipping-address";
import { ShippingMethod } from "./shipping-method";

export class OrderDto {
  public cart: string;
  public currency: string;
  public total_tax: number;
  public shipping_tax: number;
  public total_prices: number;
  public shipping_address: ShippingAddress;
  public shipping_method: ShippingMethod;
}
