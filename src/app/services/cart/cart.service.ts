/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartModelPublic, CartModelServer } from '../../models/cart/cart';
import { Products } from '../../models/products/products';
import { ProductsService } from '../products/products.service';
import { CookieService } from 'ngx-cookie-service';
import { CartItem } from 'src/app/dtos/cart-item/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  ServerURL = environment.baseUrl;

  private cartDataClient: CartModelPublic = { prodData: [{ incart: 0, id: 0 }], total: 0 };

  // This will be sent to the backend Server as post data
  // Cart Data variable to store the cart information on the server
  private cartDataServer: CartModelServer = {
    data: [
      {
        product: undefined,
        numInCart: 0,
      },
    ],

    total: 0,
  };

  info: CartModelPublic;

  cartTotal$ = new BehaviorSubject<Number>(0);

  productTotal$ = new BehaviorSubject<Number>(0);

  // Data variable to store the cart information on the client's local storage

  cartDataObs$ = new BehaviorSubject<CartModelServer>(this.cartDataServer);

  constructor(
    private productService: ProductsService,
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {
    if (cookieService.check('cart')) {
      this.info = JSON.parse(this.cookieService.get('cart'));
      this.cartTotal$.next(this.cartDataServer.total);
      this.cartDataObs$.next(this.cartDataServer);
      let total = 0;
      this.cartDataServer.data.forEach((element) => {
        total += element.numInCart;
      });
      this.productTotal$.next(total);
    }

    if (this.info !== null && this.info !== undefined && this.info.prodData[0].incart !== 0) {
      // assign the value to our data variable which corresponds to the this.cookieService data format
      this.cartDataClient = this.info;
      // Loop through each entry and put it in the cartDataServer object
      this.cartDataClient.prodData.forEach((p) => {
        this.productService.getCurrentData(p.id).subscribe((actualProdInfo: Products) => {
          if (this.cartDataServer.data[0].numInCart === 0) {
            this.cartDataServer.data[0].numInCart = p.incart;
            this.cartDataServer.data[0].product = actualProdInfo;
            this.CalculateTotal();
            this.cartDataClient.total = this.cartDataServer.total;
            this.cookieService.set('cart', JSON.stringify(this.cartDataClient));
          } else {
            this.cartDataServer.data.push({
              numInCart: p.incart,
              product: actualProdInfo,
            });
            this.CalculateTotal();
            this.cartDataClient.total = this.cartDataServer.total;
            this.cookieService.set('cart', JSON.stringify(this.cartDataClient));
          }
          this.cartDataObs$.next(this.cartDataServer);
        });
      });
    }
  }

  deleteCart() {
    this.cookieService.delete('cart');
    this.cartDataServer = {
      data: [
        {
          product: undefined,
          numInCart: 0,
        },
      ],
      total: 0,
    };
    this.cartDataObs$.next(this.cartDataServer);
    this.cartTotal$.next(this.cartDataServer.total);
    let total = 0;
    this.cartDataServer.data.forEach((element) => {
      total += element.numInCart;
    });
    this.productTotal$.next(total);
  }

  CalculateSubTotal(index): Number {
    let subTotal = 0;

    let p = this.cartDataServer.data[index];
    // @ts-ignore
    subTotal = p.product.price * p.numInCart;

    return subTotal;
  }

  AddProductToCart(id: Number, quantity?: number) {
    this.productService.getCurrentData(id).subscribe((prod) => {
      // If the cart is empty
      if (this.cartDataServer.data[0].product === undefined) {
        this.cartDataServer.data[0].product = prod;
        this.cartDataServer.data[0].numInCart = quantity !== undefined ? quantity : 1;
        this.CalculateTotal();
        this.cartDataClient.prodData[0].incart = this.cartDataServer.data[0].numInCart;
        this.cartDataClient.prodData[0].id = prod.id;
        this.cartDataClient.total = this.cartDataServer.total;
        this.cookieService.set('cart', JSON.stringify(this.cartDataClient));
        this.cartDataObs$.next(this.cartDataServer);
        // this.toast.success(`${prod.name} added to the cart.`, "Product Added", {
        //   timeOut: 1500,
        //   progressBar: true,
        //   progressAnimation: 'increasing',
        //   positionClass: 'toast-top-right'
        // })
      } // END of IF
      // Cart is not empty
      else {
        let index = this.cartDataServer.data.findIndex((p) => p.product.id === prod.id);

        // 1. If chosen product is already in cart array
        if (index !== -1) {
          if (quantity !== undefined && quantity <= prod.quantity) {
            // @ts-ignore
            this.cartDataServer.data[index].numInCart =
              this.cartDataServer.data[index].numInCart < prod.quantity ? quantity : prod.quantity;
          } else {
            // @ts-ignore
            this.cartDataServer.data[index].numInCart < prod.quantity
              ? this.cartDataServer.data[index].numInCart++
              : prod.quantity;
          }

          this.cartDataClient.prodData[index].incart = this.cartDataServer.data[index].numInCart;
          // this.toast.info(`${prod.name} quantity updated in the cart.`, "Product Updated", {
          //   timeOut: 1500,
          //   progressBar: true,
          //   progressAnimation: 'increasing',
          //   positionClass: 'toast-top-right'
          // })
        }
        // 2. If chosen product is not in cart array
        else {
          this.cartDataServer.data.push({
            product: prod,
            numInCart: 1,
          });
          this.cartDataClient.prodData.push({
            incart: 1,
            id: prod.id,
          });
          // this.toast.success(`${prod.name} added to the cart.`, "Product Added", {
          //   timeOut: 1500,
          //   progressBar: true,
          //   progressAnimation: 'increasing',
          //   positionClass: 'toast-top-right'
          // })
        }
        this.CalculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        this.cookieService.set('cart', JSON.stringify(this.cartDataClient));
        this.cartDataObs$.next(this.cartDataServer);
      } // END of ELSE
    });
  }

  UpdateCartData(index, increase: Boolean) {
    const data = this.cartDataServer.data[index];
    if (increase) {
      // @ts-ignore
      data.numInCart < data.product.quantity ? data.numInCart++ : data.product.quantity;
      this.cartDataClient.prodData[index].incart = data.numInCart;
      this.CalculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;
      this.cartDataObs$.next(this.cartDataServer);
      this.cookieService.set('cart', JSON.stringify(this.cartDataClient));
    } else {
      // @ts-ignore
      data.numInCart--;

      // @ts-ignore
      if (data.numInCart < 1) {
        this.DeleteProductFromCart(index);
        this.cartDataObs$.next(this.cartDataServer);
      } else {
        // @ts-ignore
        this.cartDataObs$.next(this.cartDataServer);
        this.cartDataClient.prodData[index].incart = data.numInCart;
        this.CalculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        this.cookieService.set('cart', JSON.stringify(this.cartDataClient));
      }
    }
  }

  DeleteProductFromCart(index) {
    /*    console.log(this.cartDataClient.prodData[index].prodId);
        console.log(this.cartDataServer.data[index].product.id);*/

    // if (window.confirm('Are you sure you want to delete the item?')) {
    this.cartDataServer.data.splice(index, 1);
    this.cartDataClient.prodData.splice(index, 1);
    this.CalculateTotal();
    this.cartDataClient.total = this.cartDataServer.total;

    if (this.cartDataClient.total === 0) {
      this.cartDataClient = { prodData: [{ incart: 0, id: 0 }], total: 0 };
      this.cookieService.set('cart', JSON.stringify(this.cartDataClient));
    } else {
      this.cookieService.set('cart', JSON.stringify(this.cartDataClient));
    }

    if (this.cartDataServer.total === 0) {
      this.cartDataServer = {
        data: [
          {
            product: undefined,
            numInCart: 0,
          },
        ],
        total: 0,
      };
      this.cartDataObs$.next(this.cartDataServer);
    } else {
      this.cartDataObs$.next(this.cartDataServer);
    }
    // }
    // If the user doesn't want to delete the product, hits the CANCEL button
    // else {
    //   return;
    // }
  }

  private CalculateTotal() {
    let Total = 0;

    this.cartDataServer.data.forEach((p) => {
      const { numInCart } = p;
      const { price } = p.product;
      // @ts-ignore
      Total += numInCart * price;
    });
    this.cartDataServer.total = Total;
    this.cartTotal$.next(this.cartDataServer.total);
    let total = 0;
    this.cartDataServer.data.forEach((element) => {
      total += element.numInCart;
    });
    this.productTotal$.next(total);
  }

  resetServerData() {
    this.cartDataServer = {
      data: [
        {
          product: undefined,
          numInCart: 0,
        },
      ],
      total: 0,
    };
    this.cartDataObs$.next(this.cartDataServer);
  }

  // Initiate Cart
  InitiateBasket(token: any) {
    token = 'token ' + token;
    return this.httpClient.post<any>(
      `${environment.baseUrl}carts`,
      {},
      {
        headers: new HttpHeaders().set('Authorization', token),
        observe: 'response',
      }
    );
  }

  // eslint-disable-next-line spaced-comment
  // Add item to Cart

  addItemToCart(data: any, token: any) {
    token = 'token ' + token;
    return this.httpClient.post(`${environment.baseUrl}carts/items`, data, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  // Delete item from Cart
  deleteItemToCart(id: any, token: any) {
    token = 'token ' + token;
    return this.httpClient.delete(`${environment.baseUrl}carts/items/${id}`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  // get customer Cart
  getCart(token: any) {
    token = 'token ' + token;
    return this.httpClient.get<any>(`${environment.baseUrl}carts`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  store(token: any) {
    token = 'token ' + token;
    return this.httpClient.post<any>(`${environment.baseUrl}carts`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  get(token: any) {
    token = 'token ' + token;
    return this.httpClient.get<any>(`${environment.baseUrl}carts`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  update(token: any, items: CartItem[], id: any) {
    token = 'token ' + token;
    return this.httpClient.put<any>(`${environment.baseUrl}carts/${id}`, items, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  addItem(token: any, item: CartItem) {
    token = 'token ' + token;
    return this.httpClient.post(`${environment.baseUrl}carts/items`, item, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  updateItem(token: any, item: CartItem, id: any) {
    token = 'token ' + token;
    return this.httpClient.put<any>(`${environment.baseUrl}carts/items/${id}`, item, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  removeItem(token: any, id: any) {
    token = 'token ' + token;
    return this.httpClient.delete(`${environment.baseUrl}carts/items/${id}`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }
}
