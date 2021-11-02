/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/ban-types */
import { Router } from '@angular/router';
import { MenuItem } from './../menu-item';
import { Component, OnInit } from '@angular/core';
import { I18nServiceService } from '../services/i18n-service/i18n-service.service';
import { CartService } from '../services/cart/cart.service';
import { CartModelServer } from '../models/cart/cart';
import { AuthResponded } from '../models/auth/auth';
import { AuthenticationsService } from '../services/authentications/authentications.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  lang = '';
  changeLanguage = 'de';
  cartData: CartModelServer;
  cartTotal: Number;
  subTotal: Number;
  currentUser: any;
  user: any;
  totalProduct: Number;
  total = 0;
  is_seller = false;

  constructor(
    public cartService: CartService,
    private authService: AuthenticationsService,
    private i18nServiceService: I18nServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.i18nServiceService.currentLangValue === null || this.i18nServiceService.currentLangValue === 'en') {
      this.lang = 'ENGLISH–EN';
    } else if (this.i18nServiceService.currentLangValue === 'de') {
      this.lang = 'DEUTSH-DE';
    } else {
      this.lang = 'FRANCAIS-FR';
    }
    this.currentUser = this.authService.currentUserValue;
    if (this.currentUser != null) {
      this.authService.getUser(this.currentUser.token || this.currentUser['user'].token).subscribe((data) => {
        this.user = data.body;

        if (
          this.currentUser.account_type ||
          this.currentUser['user'].account_type === 'SELLER' ||
          this.currentUser.account_type ||
          this.currentUser['user'].account_type === 'Seller'
        ) {
          this.is_seller = true;
        }
      });
    }
    this.cartService.cartDataObs$.subscribe((data: CartModelServer) => {
      this.cartData = data;
      for (let inded of this.cartData.data) {
        this.total += inded.numInCart;
      }
    });
    this.cartService.cartTotal$.subscribe((total) => {
      this.cartTotal = total;
    });

    this.cartService.productTotal$.subscribe((totalProduct) => {
      this.totalProduct = totalProduct;
    });

    this.getUser();
  }

  getUser() {
    this.authService.getUser(this.currentUser.token || this.currentUser['user'].token).subscribe((data) => {
      this.user = data.body['user'].username;
    });
  }

  changeLang() {
    if (this.i18nServiceService.currentLangValue === 'en') {
      this.changeLanguage = 'de';
      this.lang = 'EN';
    } else {
      this.changeLanguage = 'en';
      this.lang = 'DE';
    }
    this.i18nServiceService.changeLocale(this.changeLanguage);
  }

  filterOrder(event) {
    if (Number(event.target.value) === 1) {
      this.changeLanguage = 'en';
      this.lang = 'ENGLISH–EN';
    } else if (Number(event.target.value) === 2) {
      this.changeLanguage = 'de';
      this.lang = 'DEUTSH-DE';
    } else {
      this.changeLanguage = 'fr';
      this.lang = 'FRANCAIS-FR';
    }
    this.i18nServiceService.changeLocale(this.changeLanguage);
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/home']);
  }
}
