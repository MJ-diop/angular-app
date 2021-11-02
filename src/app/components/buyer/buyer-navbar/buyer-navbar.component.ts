/* eslint-disable object-shorthand */
import { Address } from './../../../dtos/order/address';
/* eslint-disable @typescript-eslint/naming-convention */
import { FormGroup } from '@angular/forms';
import { AccountType } from './../../../enums/account-type.enum';
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { SellersRegisterService } from './../../../services/sellers-register/sellers-register.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/ban-types */
import { I18nServiceService } from './../../../services/i18n-service/i18n-service.service';
import { AuthResponded } from './../../../models/auth/auth';
import { CartService } from './../../../services/cart/cart.service';
import { CartModelServer } from './../../../models/cart/cart';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from 'src/app/pages/components/signup/signup.component';
import { User } from 'src/app/models/user/user';
import { BuyerRegisterComponent } from 'src/app/pages/components/buyer-register/buyer-register.component';

@Component({
  selector: 'app-buyer-navbar',
  templateUrl: './buyer-navbar.component.html',
  styleUrls: ['./buyer-navbar.component.scss'],
})
export class BuyerNavbarComponent implements OnInit {
  @ViewChild('effacerSwal', { static: false })
  private effacerSwal: SwalComponent;
  categoryParents = [];
  category = [];
  subCategory: string;
  categoryProdact: [] = [];
  imageSource: string;
  showImage = false;
  cartData: CartModelServer;
  totalProduct: Number;
  total = 0;
  cartTotal: Number;
  isSeller = false;
  currentUser: any;
  lang = '';
  changeLanguage = 'de';
  user: any;
  users: any;
  updateForm: FormGroup;
  // userAccountType = 'Seller';
  constructor(
    private authService: AuthenticationsService,
    private sellersRegisterService: SellersRegisterService,
    private categoriesService: CategoriesService,
    private router: Router,
    private i18nServiceService: I18nServiceService,
    public cartService: CartService,
    public signinDialog: MatDialog
  ) {}

  async ngOnInit() {
    if (this.i18nServiceService.currentLangValue === null || this.i18nServiceService.currentLangValue === 'en') {
      this.lang = '🇺🇸';
    } else if (this.i18nServiceService.currentLangValue === 'de') {
      this.lang = '🇩🇪';
    } else {
      this.lang = '🇫🇷';
    }
    this.currentUser = await this.authService.currentUserValue;

    if (this.currentUser) {
      this.users = await this.authService.getUser(this.currentUser.token || this.currentUser['user'].token).toPromise();
      this.user = this.users.body['user'].username || this.users.username;

      if (this.users.body['user'].account_type === 'SELLER' || this.users.body['user'].account_type === 'Seller') {
        this.isSeller = true;
      }
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

    this.getCategory();
  }

  toOpenDialog() {
    if (this.currentUser) {
      this.oldBuyerNewSeller();
    }

    if (!this.currentUser) {
      this.openDialog();
    }
  }

  oldBuyerNewSeller(): void {
    this.effacerSwal.fire();
  }

  onUpdateUser() {
    this.authService.getUser(this.currentUser.token || this.currentUser['user'].token).subscribe((data) => {
      console.log(data.body);
      const users: any = data.body;

      console.log('user test ', users.user);

      const user = {
        username: users.user.username,
        email: users.user.email,
        gender: users.user.gender,
        account_type: 'Seller',
        address: users.user.address,
      };

      console.log(user);
      this.authService.update(user, users.user.token).subscribe((res) => {
        console.log('updated from backend ', res.body);
        this.users = res.body;
        console.log(this.users);
        window.location.reload();
      });
    });
  }

  openRegisterDialog(): void {
    const dialogRef = this.signinDialog.open(BuyerRegisterComponent);
    dialogRef.afterClosed().subscribe((result) => console.log('dialog closed |' + result.toString()));
  }

  openDialog(): void {
    const dialogRef = this.signinDialog.open(SignupComponent);
    dialogRef.afterClosed().subscribe((result) => console.log('dialog closed |' + result.toString()));
  }

  getCategory(): void {
    this.categoriesService.getAllCategories().subscribe((res) => {
      this.category = res.results;

      this.categoryParents = this.category.filter((category) => category.parent === null);
    });
  }

  showCategory(data, id: number): void {
    this.subCategory = this.categoryParents[id].children;
    // this.imageSource = data.image;
    // this.showImage = true;
  }

  changeImageCategory(data): void {
    this.imageSource = data.image;
    this.showImage = true;
  }

  oNCategoryDetails(data): void {
    // console.log(data.id);
  }

  searchProducts(keyWord: string) {
    if (keyWord) {
      this.router.navigate([`product/${keyWord}`]);
    } else {
      return;
    }
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
      this.lang = 'en';
    } else if (Number(event.target.value) === 2) {
      this.changeLanguage = 'de';
      this.lang = 'de';
    } else {
      this.changeLanguage = 'fr';
      this.lang = 'fr';
    }
    this.i18nServiceService.changeLocale(this.changeLanguage);
  }

  logout(): void {
    this.authService.logOut();
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }
}
