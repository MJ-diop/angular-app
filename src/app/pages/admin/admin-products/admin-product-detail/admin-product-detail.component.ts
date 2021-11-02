/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { BreakpointObserver } from '@angular/cdk/layout';
import { ViewChild } from '@angular/core';
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AdminProductDetailService } from './services/admin-product-detail.service';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';

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

@Component({
  selector: 'app-admin-product-detail',
  templateUrl: './admin-product-detail.component.html',
  styleUrls: ['./admin-product-detail.component.scss'],
})
export class AdminProductDetailComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  menuItems: any[];
  thItem: any[];
  productDatas: [] = [];
  id;
  welcome = 'Products > Products Details';
  infos = '';
  showBtn = false;
  category;
  store;

  constructor(
    private router: ActivatedRoute,
    private observer: BreakpointObserver,
    private adminProductDetailService: AdminProductDetailService
  ) {}

  async ngOnInit(): Promise<any> {
    this.id = this.router.snapshot.params.id;

    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.thItem = THEAD.filter((thItem) => thItem);

    const productData = await this.adminProductDetailService.getProductsData(this.id).toPromise();
    this.productDatas = productData;

    const category = await this.adminProductDetailService.getCategoryById(this.productDatas['category']).toPromise();
    this.category = category.name;

    const store = await this.adminProductDetailService.getStoresById(this.productDatas['store']).toPromise();
    this.store = store.name;
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
