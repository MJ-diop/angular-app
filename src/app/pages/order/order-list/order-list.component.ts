/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { I18nServiceService } from 'src/app/services/i18n-service/i18n-service.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  listOrders = [];
  listOrder: any;
  currentUser: any;
  token: any;
  typeUser: any;
  isSeller = false;
  sellerOrderSubscription: Subscription;
  showSpinner = true;
  showMor = true;

  constructor(
    private orderService: OrderService,
    private i18nServiceService: I18nServiceService,
    private authService: AuthenticationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.token = this.currentUser.token || this.currentUser['user'].token;
    this.typeUser = this.currentUser.account_type;
    if (this.typeUser === 'Seller') {
      this.isSeller = true;
      this.getSellerOrders();
    } else {
      this.getCustomerOrders();
    }
  }

  getCustomerOrders() {
    this.orderService.getAllOrders(this.token).subscribe(
      (data) => {
        this.listOrders = data.body;
        this.listOrder = this.listOrders.slice(0, 3);
        this.showSpinner = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  viewMor() {
    this.listOrder = this.listOrders;
    this.showMor = false;
  }

  getSellerOrders() {
    this.orderService.getSellerOrders(this.token);
    this.sellerOrderSubscription = this.orderService.sellerOrdersSubject.subscribe((data) => {
      this.listOrders = data;
    });
    this.orderService.emitSellerOrders();
  }

  logout(): void {
    this.authService.logOut();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}
