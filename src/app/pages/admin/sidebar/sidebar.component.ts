/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Subscription } from 'rxjs';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { OrderService } from 'src/app/services/order/order.service';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { AdminProductsService } from '../admin-products/admin-products.service';

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

// declare interface Tr {
//   name: string;
//   price: string;
//   quantity: string;
//   amount: string;
// }
// export const TBODY: Tr[] = [
//   { name: 'CamMask', price: '€128.50', quantity: '5', amount: '€1,965.81' },
//   { name: 'CaTam', price: '€128.50', quantity: '5', amount: '€1,965.81' },
//   { name: 'Waxy', price: '€128.50', quantity: '5', amount: '€1,965.81' },
//   { name: 'WaxCa', price: '€128.50', quantity: '5', amount: '€1,965.81' },
// ];

declare interface Th {
  title: string;
}
export const THEAD: Th[] = [{ title: 'Product' }, { title: 'Price' }, { title: 'Quantity' }, { title: 'Amount' }];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  menuItems: any[];
  thItems: any[];
  trItem: any[];
  title = 'Top Selling Product';
  welcome = '';
  infos = 'here are the informations we have on your shops';
  listOrders = [];
  currentUser: any;
  sellerOrderSubscription: Subscription;
  products = [];
  topSelling = [];
  activities = [];
  users: any;
  user: any;
  showBtn = false;

  itemsP;
  itemsNameP = 'Pending orders';
  imgBgP = './../../../../assets/dashboard/Rectangle 6.svg';
  imgP = './../../../../assets/dashboard/Group.svg';

  itemsS;
  itemsNameS = 'Sold';
  imgBgS = './../../../../assets/dashboard/Rectangle 6 (1).svg';
  imgS = './../../../../assets/dashboard/Group (1).svg';

  itemsC;
  itemsNameC = 'Canceled';
  imgBgC = './../../../../assets/dashboard/Rectangle 6 (2).svg';
  imgC = './../../../../assets/dashboard/Group (2).svg';

  itemsN;
  itemsNameN = 'Clients';
  imgBgN = './../../../../assets/dashboard/Rectangle 6 (3).svg';
  imgN = './../../../../assets/dashboard/Group (3).svg';

  constructor(
    private router: Router,
    private observer: BreakpointObserver,
    private orderService: OrderService,
    private authService: AuthenticationsService,
    private adminProductsService: AdminProductsService
  ) {}

  async ngOnInit(): Promise<any> {
    this.currentUser = await this.authService.currentUserValue;

    if (this.currentUser) {
      this.users = await this.authService.getUser(this.currentUser.token || this.currentUser['user'].token).toPromise();
      this.user = this.users.body['user'].username || this.users.username;

      this.welcome = this.user;
    }

    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.thItems = THEAD.filter((thItem) => thItem);
    // this.trItem = TBODY.filter((thItem) => thItem);

    this.adminProductsService.getProducts(this.currentUser.token || this.currentUser['user'].token).subscribe((res) => {
      this.trItem = res.body.results;
      this.products = res.body.results;

      this.topSelling = this.products.filter((data) => data.rating >= 3);
    });

    this.getOrders();
  }

  getOrders() {
    this.orderService.getSellerOrders(this.currentUser.token || this.currentUser['user'].token);
    this.sellerOrderSubscription = this.orderService.sellerOrdersSubject.subscribe((data) => {
      this.listOrders = data;

      const sold = data.filter((res) => res.status === 'confirmed');
      this.itemsS = sold.length;
      this.itemsN = sold.length;

      const cancel = data.filter((res) => res.status === 'canceled');
      this.itemsC = cancel.length;

      const pending = data.filter((res) => res.status === 'initiated');
      this.itemsP = pending.length;
    });
    this.orderService.emitSellerOrders();
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
