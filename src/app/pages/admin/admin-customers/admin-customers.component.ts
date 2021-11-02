/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { delay } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { AdminCustomersService } from './services/admin-customers.service';

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
  { title: 'Customers' },
  { title: 'Phone' },
  { title: 'Number of commands' },
  { title: 'Total spend' },
];

@Component({
  selector: 'app-admin-customers',
  templateUrl: './admin-customers.component.html',
  styleUrls: ['./admin-customers.component.scss'],
})
export class AdminCustomersComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  menuItems: any[];
  thItem: any[];
  trItem: any[];
  title;
  welcome = 'Customers';
  infos = '';
  currentUser: any;
  categoryName: any;
  terms;
  showBtn = false;

  constructor(
    private observer: BreakpointObserver,
    private authService: AuthenticationsService,
    private adminCustomersService: AdminCustomersService
  ) {}

  async ngOnInit(): Promise<any> {
    this.currentUser = await this.authService.currentUserValue;
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.thItem = THEAD.filter((thItem) => thItem);

    this.adminCustomersService
      .getCustomers(this.currentUser.token || this.currentUser['user'].token)
      .subscribe((res) => {
        this.trItem = res.body;
        console.dir(res.body);
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
