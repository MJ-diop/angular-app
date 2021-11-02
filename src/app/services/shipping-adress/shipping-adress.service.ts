import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { ShippingAddress } from '../../models/shipping-address/shipping-address';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ShippingAdressService {
  constructor(private http: HttpClient) {}

  create(token: any, shippingAdress: ShippingAddress) {
    token = 'token ' + token;
    return this.http.post<any>(`${environment.baseUrl}shippings/addresses`, shippingAdress, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  all(token: any) {
    token = 'token ' + token;
    return this.http.get<any>(`${environment.baseUrl}shippings/addresses`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  get(token: any, id: string){
    token = 'token ' + token;
    return this.http.get<any>(`${environment.baseUrl}shippings/addresses/${id}`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    })
  }

  update(token: any, id: string, data: any){
    token = 'token ' + token;
    return this.http.put<any>(`${environment.baseUrl}shippings/addresses/${id}`, data, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    })
  }

  delete(token: any, id: string){
    token = 'token ' + token;
    return this.http.delete<any>(`${environment.baseUrl}shippings/addresses/${id}`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    })
  }
}
