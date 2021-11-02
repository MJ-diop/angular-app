import { HttpClient } from '@angular/common/http';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminProductDetailService {
  constructor(private http: HttpClient) {}

  getProductsData(id: string) {
    return this.http.get<any>(`${environment.baseUrl}products/${id}`);
  }

  getCategoryById(id: string) {
    return this.http.get<any>(`${environment.baseUrl}categories/${id}`);
  }

  getStoresById(id: string) {
    return this.http.get<any>(`${environment.baseUrl}stores/${id}`);
  }
}
