import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { I18nServiceService } from 'src/app/services/i18n-service/i18n-service.service';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ProductsService } from 'src/app/services/products/products.service';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthResponded } from 'src/app/models/auth/auth';
import { WishlistService } from 'src/app/services/wishlist/wishlist.service';
import Swal from 'sweetalert2';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  @ViewChild('effacerSwal', { static: false })
  private effacerSwal: SwalComponent;
  currentUser: any;
  token;
  wishlists = [];
  items;
  similarProducts = [];
  home = '/';
  categoryName = 'wishlists';
  showSpinner = true;
  productId: any;

  constructor(
    private productsService: ProductsService,
    private authService: AuthenticationsService,
    private wishlistService: WishlistService,
    private i18nServiceService: I18nServiceService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.token = this.currentUser.token || this.currentUser['user'].token;
    this.getProducts();
    this.getWishlist();
  }

  getWishlist(): void {
    this.wishlistService.getAllWishlist(this.token).subscribe((data) => {
      this.items = data.body.items;
      this.showSpinner = false;
      this.items.forEach((element) => {
        this.productsService.getCurrentData(element.product).subscribe((res) => {
          const item = {
            item: element.id,
            product: res,
          };
          this.wishlists.push(item);
        });
      });
    });
  }

  getProducts() {
    this.productsService.getAllProducts().subscribe((data) => {
      this.similarProducts = data.results.slice(0, 4);
    });
  }

  addToCart(data): void {
    const id = data.product.id;
    this.cartService.AddProductToCart(id);
    Swal.fire({
      // position: 'top-end',
      icon: 'success',
      title: 'Product added to cart!',
      showConfirmButton: false,
      timer: 2000,
    }).then(() => {
      console.log(data);
      this.wishlistService.deletWishlist(data.item, this.token).subscribe(
        (res) => {
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  formatPrice(price: any) {
    let prices = price.split('.');
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

  deleteProducts() {
    this.wishlistService.deletWishlist(this.productId, this.token).subscribe(
      (res) => {
        Swal.fire({
          // position: 'top-end',
          icon: 'success',
          title: 'Items removed to your Wishlist!',
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          // this.getWishlist();
          window.location.reload();
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  removeWishlist(id: any) {
    this.productId = id;
    this.effacerSwal.fire();
  }
}
