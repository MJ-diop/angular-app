import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  constructor(private http: HttpClient) {}

  getWallet(token: string) {
    token = `token  ${token}`;
    return this.http.get<any>(`${environment.baseUrl}wallets`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }
}
