/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Injectable } from '@angular/core';
import { OrderDto } from 'src/app/dtos/orders/order-dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  initiate(token: any, order: OrderDto) {
    token = 'token ' + token;
    return this.http.post<any>(`${environment.baseUrl}orders/initiate`, order, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  allSellerOrders(token: any) {
    token = 'token ' + token;
    return this.http.get<any>(`${environment.baseUrl}/orders/sellers`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  allCustomerOrders(token: any) {
    token = 'token ' + token;
    return this.http.get<any>(`${environment.baseUrl}/orders/customers`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  allSellerCustomers(token: any) {
    token = 'token ' + token;
    return this.http.get<any>(`${environment.baseUrl}/orders/sellers/customers`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }
}
