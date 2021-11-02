import { Products } from '../products/products';

export type CartModelPublic = {
  total: number;
  prodData: [
    {
      id: number;
      incart: number;
    }
  ];
};

export type CartModelServer = {
  total: number;
  data: [
    {
      product: Products;
      numInCart: number;
    }
  ];
};
