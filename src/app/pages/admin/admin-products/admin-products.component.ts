/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { delay } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminProductsService } from './admin-products.service';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: '/sales-analytics', title: 'Sales analytics', icon: 'leaderboard', class: '' },
  { path: '/admin-products', title: 'Products', icon: 'ballot', class: '' },
  { path: '/admin-orders', title: 'Orders', icon: 'lock', class: '' },
  { path: '/admin-customers', title: 'Customers', icon: 'person', class: '' },
];

declare interface Th {
  title: string;
}
export const THEAD: Th[] = [{ title: 'Product' }, { title: 'Category' }, { title: 'Availablity' }, { title: 'Total' }];

declare interface Tr {
  image: string;
  name: string;
  price: string;
  quantity: string;
  amount: string;
}
export const TBODY: Tr[] = [
  {
    image: 'https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg',
    name: 'CamerMask',
    price: 'Art',
    quantity: '2/2 channels',
    amount: '€2000',
  },
  {
    image: 'https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg',
    name: 'Tata Lisa',
    price: 'Clothing',
    quantity: '2/2 channels',
    amount: '€2000',
  },
  {
    image: 'https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg',
    name: 'Meet',
    price: 'Food',
    quantity: '2/2 channels',
    amount: '€2000',
  },
  {
    image: 'https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg',
    name: 'CamerBrush',
    price: 'Art',
    quantity: '2/2 channels',
    amount: '€2000',
  },
  {
    image: 'https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg',
    name: 'MamaLisa',
    price: 'Art',
    quantity: 'Out of Stocks',
    amount: '€2000',
  },
];

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  menuItems: any[];
  thItem: any[];
  trItem: any[];
  title;
  welcome = 'Products';
  infos = '';
  currentUser: any;
  categoryName: any;
  terms;
  showBtn = false;

  constructor(
    private router: Router,
    private observer: BreakpointObserver,
    private authService: AuthenticationsService,
    private adminProductsService: AdminProductsService
  ) {}

  async ngOnInit(): Promise<any> {
    this.currentUser = await this.authService.currentUserValue;
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.thItem = THEAD.filter((thItem) => thItem);
    // this.trItem = TBODY.filter((thItem) => thItem);

    this.getProducts();
  }

  getProducts() {
    this.adminProductsService.getProducts(this.currentUser.token || this.currentUser['user'].token).subscribe((res) => {
      this.trItem = res.body.results;

      this.trItem.forEach((element, i) => {
        this.adminProductsService.getCategory(element.category).subscribe((data) => {
          this.trItem[i].category = data.name;
          this.categoryName = data.name;
        });
      });
    });
  }

  ngAfterViewInit(): void {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
          this.showBtn = true;
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }
}
