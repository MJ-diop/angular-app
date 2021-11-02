/* eslint-disable @typescript-eslint/naming-convention */
import { ProductReview } from '../product-review/product-review';

export class Products {
  id: number;
  store: number;
  category: number;
  created_by: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  date_added: string;
  last_updated: string;
  quantity: number;
  is_active: boolean;
  images: string[];
  reviews: ProductReview[];
}
