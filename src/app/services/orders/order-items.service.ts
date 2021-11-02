import { Injectable } from '@angular/core';

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
export class OrderItemsService {
  constructor(private http: HttpClient) {}

  update(token: any, orderItemId: string, data: any) {
    token = 'token ' + token;
    return this.http.put<any>(`${environment.baseUrl}orders/items/${orderItemId}`, data, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  updateCartItemQuantity(token: any, orderId: string, orderItemId: string, data: any) {
    token = 'token ' + token;
    return this.http.put<any>(`${environment.baseUrl}orders/${orderId}/items/${orderItemId}`, data, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  createShipment(token: any, orderItemId: string) {
    token = 'token ' + token;
    return this.http.post<any>(`${environment.baseUrl}orders/items/${orderItemId}/shipments`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  createTransaction(token: any, orderItemId: string) {
    token = 'token ' + token;
    return this.http.post<any>(`${environment.baseUrl}orders/items/${orderItemId}/transactions`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }
}
