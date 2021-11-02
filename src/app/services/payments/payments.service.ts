/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { PaymentDto } from 'src/app/dtos/payments/payment-dto';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  constructor(private http: HttpClient) {}

  getBraintreeClientToken(token: any) {
    token = 'token ' + token;
    return this.http.get<any>(`${environment.baseUrl}/payments/braintree`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  braintreeTransactionSale(token: any, payment: PaymentDto) {
    token = 'token ' + token;
    return this.http.post<any>(`${environment.baseUrl}/payments/braintree`, payment, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  creteStripePaymentIntent(token: any, payment: PaymentDto) {
    token = 'token ' + token;
    return this.http.post(`${environment.baseUrl}/payments/stripe`, payment, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  confirmStripePaymentIten(token: any, data: any, paymentItentId: string) {
    token = 'token ' + token;
    return this.http.put<any>(`${environment.baseUrl}/payments/stripe/${paymentItentId}`, data, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }
}
