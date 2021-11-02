/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { PaymentDto } from '../dtos/payments/payment-dto';
import { TransactionDto } from '../dtos/payment/transaction-dto';
@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  constructor(private http: HttpClient) {}

  payment(body: any, token: string) {
    token = 'token ' + token;
    return this.http.post<any>(`${environment.baseUrl}payments/stripe`, body, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  confirmCardPayment(token: string, id: any, body: any) {
    token = 'token ' + token;
    return this.http.put<any>(`${environment.baseUrl}payments/stripe/${id}`, body, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  getBraintreeClientToken(token: any) {
    token = 'token ' + token;
    return this.http.get<any>(`${environment.baseUrl}payments/braintree`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  braintreeTransactionSale(token: any, payment: TransactionDto) {
    token = 'token ' + token;
    return this.http.post<any>(`${environment.baseUrl}payments/braintree`, payment, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  creteStripePaymentIntent(token: any, payment: PaymentDto) {
    token = 'token ' + token;
    return this.http.post(`${environment.baseUrl}payments/stripe`, payment, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  confirmStripePaymentIten(token: any, data: any, paymentItentId: string) {
    token = 'token ' + token;
    return this.http.put<any>(`${environment.baseUrl}payments/stripe/${paymentItentId}`, data, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }
}
