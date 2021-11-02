/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/quotes */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Products } from '../../models/products/products';
import { Observable } from 'rxjs';
import { Parcel } from 'src/app/models/parcel/parcel';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts() {
    return this.httpClient.get<any>(`${environment.baseUrl}products`);
  }

  getSellersProducts(token: any) {
    token = 'token ' + token;
    return this.httpClient.get<any>(`${environment.baseUrl}products/sellers`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  getLatestProducts() {
    return this.httpClient.get<any>(`${environment.baseUrl}/products/latest`);
  }

  addProduct(product: Products, token: string) {
    token = 'token ' + token;
    return this.httpClient.post(`${environment.baseUrl}products`, product, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  updateProduct(id: number, data: any, token: string) {
    token = 'token ' + token;
    return this.httpClient.put<any>(`${environment.baseUrl}products/${id}`, data, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  getCurrentData(id: any) {
    return this.httpClient.get<any>(`${environment.baseUrl}products/${id}`);
  }

  deleteProduct(id: number, token: string) {
    token = 'token ' + token;
    return this.httpClient.delete(`${environment.baseUrl}products/${id}`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  searchProducts(keyword: any) {
    return this.httpClient.get<any>(`${environment.baseUrl}products/?search=${keyword}`);
  }

  uploadFile(file: any, token: string) {
    token = 'token ' + token;
    // const image = { file: file };
    return this.httpClient.post<any>(`${environment.baseUrl}files`, file, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  bestDeals() {
    return this.httpClient.get<any>(`${environment.baseUrl}products/latest`);
  }

  mostPopular() {
    return this.httpClient.get<any>(`${environment.baseUrl}products/most-viewed`);
  }

  addParcel(id: number, parcel: Parcel, token: string) {
    token = 'token ' + token;
    return this.httpClient.post(`${environment.baseUrl}products/${id}/parcels`, parcel, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }
}
