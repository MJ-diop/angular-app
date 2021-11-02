/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/ban-types */
import { ShippingAddress } from 'src/app/models/shipping-address/shipping-address';
import { ShipmentDto } from './shipment-dto';
export class OrderItem {
  id?: string | undefined;
  // eslint-disable-next-line id-blacklist
  number: Number;
  shipping_address: ShippingAddress;
  shipping_tax: Number;
  total_prices: Number;
  payment_method: any;
  seller: any;
  cart_item: any;
  status: any;
  shipment: ShipmentDto;
}
