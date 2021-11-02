/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ViewChild, OnInit } from '@angular/core';
import { CartModelServer } from 'src/app/models/cart/cart';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductsService } from 'src/app/services/products/products.service';
import Swal from 'sweetalert2';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { I18nServiceService } from 'src/app/services/i18n-service/i18n-service.service';
import { Router } from '@angular/router';
import { WishlistService } from 'src/app/services/wishlist/wishlist.service';
import { AuthResponded } from 'src/app/models/auth/auth';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  @ViewChild('effacerSwal', { static: false })
  private effacerSwal: SwalComponent;
  cartData: CartModelServer;
  cartTotal: Number;
  subTotal: Number;
  products = [];
  bestSelling = [];
  goodStuff = [];
  idProduct: any;
  quantity: any;
  currentUser: any;
  token;
  title = 'Cart';

  constructor(
    public cartService: CartService,
    private productsService: ProductsService,
    private i18nServiceService: I18nServiceService,
    private wishlistService: WishlistService,
    private router: Router,
    private authService: AuthenticationsService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    this.cartService.cartDataObs$.subscribe((data: CartModelServer) => {
      this.cartData = data;
    });

    this.cartService.cartTotal$.subscribe((total) => {
      this.cartTotal = total;
    });

    this.getProducts();
  }

  ChangeQuantity(id: Number, increaseQuantity: Boolean) {
    this.cartService.UpdateCartData(id, increaseQuantity);
  }

  getProducts() {
    this.productsService.getAllProducts().subscribe((data) => {
      this.products = data.results;
      this.products = this.products.slice(0, 15);
      this.bestSelling = this.products.slice(0, 5);
      this.goodStuff = this.products.slice(1, 8);
    });
  }

  addToCart(id: Number) {
    this.cartService.AddProductToCart(id);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Quantity not available!',
      showConfirmButton: false,
      timer: 2000,
    });
  }

  suppressionProduict(id) {
    this.idProduct = id;
    this.effacerSwal.fire();
  }

  formatPrice(price: any) {
    var prices = price.split('.');
    if (this.i18nServiceService.currentLangValue === null || this.i18nServiceService.currentLangValue === 'en') {
      prices = price;
    } else {
      prices = prices[0] + ',' + prices[1];
      if (prices.split(',').length > 2) {
        prices = prices.split(',')[0] + '' + prices.split(',')[1] + ',' + prices.split(',')[2];
      }
    }
    return prices;
  }

  changeQuantity(e, c, index) {
    const quantity = Number(e.target.value);
    const temp = c.numInCart;
    if (quantity > c.product.quantity) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${c.product.quantity} articles of ${c.product.name} left`,
      });
      c.numInCart = c.product.quantity;
    } else if (quantity <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You cannot have 0 article',
      });
      c.numInCart = 1;
    } else {
      c.numInCart = quantity - 1;
      this.ChangeQuantity(index, true);
    }

    console.log(quantity, c);
  }

  AddWishlist(id: any) {
    if (!this.currentUser) {
      this.router.navigate(['/register']);
    }
    this.token = this.currentUser.token || this.currentUser['user'].token;
    const products = {
      product: id,
    };
    this.wishlistService.AddToWishlist(products, this.token).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Product added to your Wishlist!',
          showConfirmButton: false,
          timer: 2000,
        });

        console.log(res);
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: error.error.error,
          showConfirmButton: false,
          timer: 2000,
        });
        console.log(error);
      }
    );
    console.log('wishlist added');
  }
}
