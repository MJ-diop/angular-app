/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StripePaymentDto } from 'src/app/dtos/payment/stripe-payment-dto';
import { environment } from 'src/environments/environment';
import { BankAccount } from 'src/app/models/payment/bank-account';
import { CreditCard } from 'src/app/models/payment/credit-card';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private httpClient: HttpClient) {}

  initiateStripePayment(token: any, info: StripePaymentDto) {
    token = 'token ' + token;
    return this.httpClient.post<any>(`${environment.baseUrl}payments/stripe`, info, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  confirmStripePayment(token: any, paymentIntentId: any, order: any) {
    token = 'token ' + token;
    return this.httpClient.put<any>(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `${environment.baseUrl}payments/stripe/${paymentIntentId}`,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      { order: order },
      {
        headers: new HttpHeaders().set('Authorization', token),
        observe: 'response',
      }
    );
  }

  addBankAccount(token: any, account: BankAccount) {
    token = 'token ' + token;
    return this.httpClient.post<any>(`${environment.baseUrl}payments/accounts`, account, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  getBankAccount(token: any) {
    token = 'token ' + token;
    return this.httpClient.get<any>(`${environment.baseUrl}payments/accounts`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  deleteBankAccount(id: string, token: string) {
    token = 'token ' + token;
    return this.httpClient.delete(`${environment.baseUrl}payments/accounts/${id}`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  addCreditCard(token: any, card: CreditCard) {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    token = 'token ' + token;
    return this.httpClient.post<any>(`${environment.baseUrl}payments/cards`, card, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  getCreditCard(token: any) {
    token = 'token ' + token;
    return this.httpClient.get<any>(`${environment.baseUrl}payments/cards`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  deleteCreditCard(id: string, token: string) {
    token = 'token ' + token;
    return this.httpClient.delete(`${environment.baseUrl}payments/cards/${id}`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }
}
