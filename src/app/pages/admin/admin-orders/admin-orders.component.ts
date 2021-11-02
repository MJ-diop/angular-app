/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Subscription } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
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

declare interface Th {
  title: string;
}
export const THEAD: Th[] = [
  { title: 'ID' },
  { title: 'Product' },
  { title: 'Category' },
  { title: 'Payment' },
  { title: 'Status' },
  { title: 'Total' },
  { title: 'Delivery Date' },
  { title: 'Action' },
];

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
})
export class AdminOrdersComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  menuItems: any[];
  thItem: any[];
  trItem: any[];
  title;
  welcome = 'Orders';
  infos = '';
  currentUser: any;
  showOrdersItems = true;
  sellerOrderSubscription: Subscription;
  listOrders = [];
  categoryName: any;
  terms;
  showBtn = false;

  itemsP;
  itemsNameP = 'Pending';
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
  itemsNameN = 'Total products';
  imgBgN = './../../../../assets/dashboard/Rectangle 6 (3).svg';
  imgN = './../../../../assets/dashboard/Group (3).svg';

  constructor(
    private observer: BreakpointObserver,
    private authService: AuthenticationsService,
    private orderService: OrderService,
    private adminProductsService: AdminProductsService
  ) {}

  async ngOnInit(): Promise<any> {
    this.currentUser = await this.authService.currentUserValue;
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.thItem = THEAD.filter((thItem) => thItem);
    // this.trItem = TBODY.filter((thItem) => thItem);

    this.adminProductsService.getProducts(this.currentUser.token || this.currentUser['user'].token).subscribe((res) => {
      this.itemsN = res.body.results.length;
    });

    this.getOrders();
  }

  getOrders() {
    this.orderService.getSellerOrders(this.currentUser.token || this.currentUser['user'].token);
    this.sellerOrderSubscription = this.orderService.sellerOrdersSubject.subscribe((data) => {
      this.listOrders = data;

      const sold = data.filter((res) => res.status === 'confirmed');
      this.itemsS = sold.length;

      const cancel = data.filter((res) => res.status === 'canceled');
      this.itemsC = cancel.length;

      const pending = data.filter((res) => res.status === 'initiated');
      this.itemsP = pending.length;

      this.listOrders.forEach((element, i) => {
        // console.dir(element);
        // console.dir(i);
        // const category = await this.adminProductsService.getCategory(element.cart_item.product.category).toPromise();
        // console.dir(category[i]);
        // this.categoryName = category.name;
        this.adminProductsService.getCategory(element.cart_item.product.category).subscribe((category) => {
          this.listOrders[i].category = category.name;
          this.categoryName = this.listOrders[i].category;
          // console.dir(this.listOrders);
          // console.dir(this.listOrders[i]);
          // console.dir(this.listOrders[i].category);
        });
      });
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
