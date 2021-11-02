import { WishlistService } from './../../services/wishlist/wishlist.service';
import { Router } from '@angular/router';
import { AuthResponded } from './../../models/auth/auth';
import { AuthenticationsService } from './../../services/authentications/authentications.service';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { I18nServiceService } from 'src/app/services/i18n-service/i18n-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() products: any[];
  isIconClicked = false;
  currentUser: any;
  token;
  constructor(
    private i18nServiceService: I18nServiceService,
    private cartService: CartService,
    private authService: AuthenticationsService,
    private wishlistService: WishlistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
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

  addToCart(id: Number) {
    this.cartService.AddProductToCart(id);
    Swal.fire({
      // position: 'top-end',
      icon: 'success',
      title: 'Product added to cart!',
      showConfirmButton: false,
      timer: 2000,
    });
  }

  AddWishlist(id: any) {
    this.isIconClicked = true;
    if (!this.currentUser) {
      this.router.navigate(['/register']);
    }
    this.token = this.currentUser.user.token;
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
        this.isIconClicked = false;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: error.error.error,
          showConfirmButton: false,
          timer: 2000,
        });
        this.isIconClicked = false;
      }
    );
  }

  redirectProduct(id, index): void {
    this.router.navigate([`/product-detail/${id}/${index}/`]);
  }

  imageClicked(id, index) {
    if (!this.isIconClicked) {
      this.redirectProduct(id, index);
    }
  }
}
