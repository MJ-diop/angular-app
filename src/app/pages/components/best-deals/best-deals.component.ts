import { Input } from '@angular/core';
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Router } from '@angular/router';
import { WishlistService } from './../../../services/wishlist/wishlist.service';
import { CartService } from './../../../services/cart/cart.service';
import { I18nServiceService } from './../../../services/i18n-service/i18n-service.service';
import { ProductsService } from './../../../services/products/products.service';
import { AuthenticationsService } from './../../../services/authentications/authentications.service';
import { AuthResponded } from './../../../models/auth/auth';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-best-deals',
  templateUrl: './best-deals.component.html',
  styleUrls: ['./best-deals.component.scss'],
})
export class BestDealsComponent implements OnInit {
  @Input() title: string;
  @Input() carouselId: string;
  @Input() products = [];
  bestSelling = [];
  goodStuff = [];
  allCountries = ['EUROPE', 'AFRIQUE', 'ASIE', 'AMERIQUE', 'OCEANIE', 'OTHERS'];
  countries = [];
  left = false;
  right = true;
  firstIndex = 0;
  currentUser: any;
  lang = false;
  token;
  isIconClicked = false;

  constructor(
    private authService: AuthenticationsService,
    private productsService: ProductsService,
    private i18nServiceService: I18nServiceService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.countries = this.allCountries.slice(this.firstIndex, this.firstIndex + 3);
    this.firstIndex = this.firstIndex + 1;
    if (this.i18nServiceService.currentLangValue === null || this.i18nServiceService.currentLangValue === 'en') {
      this.lang = true;
    }

    // this.productsService.mostPopular().subscribe((res) => {
    //   this.products = res.results;
    //   this.showSpinner = false;
    //   console.log('Most popular ', res);
    // });

    // this.getProducts();
  }
  handleLeftClick() {
    if (this.firstIndex > 0) {
      this.left = true;
      this.right = true;
      this.firstIndex = this.firstIndex - 1;
      this.countries = this.allCountries.slice(this.firstIndex, this.firstIndex + 3);
    }
    if (this.firstIndex <= 0) {
      this.firstIndex = 1;
      this.left = false;
      this.right = true;
    }
  }
  addToCart(id: Number): void {
    this.isIconClicked = true;
    this.cartService.AddProductToCart(id);
    Swal.fire({
      icon: 'success',
      title: 'Product added to cart!',
      showConfirmButton: false,
      timer: 2000,
    }).then(() => {
      this.isIconClicked = false;
    });
  }
  handleRightClick(): void {
    if (this.allCountries.length - this.firstIndex >= 3) {
      if (this.left && this.right) {
        this.firstIndex = this.firstIndex + 1;
        this.countries = this.allCountries.slice(this.firstIndex, this.firstIndex + 3);
      } else {
        this.countries = this.allCountries.slice(this.firstIndex, this.firstIndex + 3);
        this.firstIndex = this.firstIndex + 1;
      }
      this.left = true;
      this.right = true;

      if (this.allCountries.length - this.firstIndex <= 3) {
        this.firstIndex = this.allCountries.length - 3;
        this.left = true;
        this.right = false;
      }
    }
  }

  redirectProduct(id, index): void {
    this.router.navigate([`/product-detail/${id}/${index}/`]);
  }
  // getProducts() {
  //   this.productsService.getAllProducts().subscribe((data) => {
  //     // this.products = data.results;
  //     // this.products = this.products.slice(0, 25);
  //     // this.bestSelling = this.products.slice(0, 10);
  //     // this.goodStuff = this.products.slice(1, 11);
  //   });
  // }

  searchProducts(keyWord: string) {
    if (keyWord) {
      this.router.navigate([`product/${keyWord}`]);
    } else {
      return;
    }
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

  AddWishlist(id: any) {
    this.isIconClicked = true;
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

  imageClicked(id, index) {
    if (!this.isIconClicked) {
      this.redirectProduct(id, index);
    }
  }
}
