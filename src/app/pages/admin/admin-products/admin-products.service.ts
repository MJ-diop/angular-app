/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { environment } from 'src/environments/environment';
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminProductsService {
  constructor(private http: HttpClient) {}

  getProducts(token: string) {
    token = 'token ' + token;
    return this.http.get<any>(`${environment.baseUrl}products/sellers`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  getCategory(id: string) {
    return this.http.get<any>(`${environment.baseUrl}categories/${id}`);
  }
}
