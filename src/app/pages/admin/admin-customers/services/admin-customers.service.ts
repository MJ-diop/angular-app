import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminCustomersService {
  constructor(private http: HttpClient) {}

  getCustomers(token: string) {
    token = 'token ' + token;
    return this.http.get<any>(`${environment.baseUrl}orders/sellers/customers`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }
}
