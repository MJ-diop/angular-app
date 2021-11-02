import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { ProductReview } from 'src/app/models/product-review/product-review';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class ProductReviewService {
  constructor(private httpClient: HttpClient) {}

  addReview(productReview: ProductReview, token: string) {
    token = 'token ' + token;
    return this.httpClient.post(`${environment.baseUrl}products/reviews`, productReview, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  updateReview(id: number, data: any, token: string) {
    token = 'token ' + token;
    return this.httpClient.put<any>(`${environment.baseUrl}products/reviews/${id}`, data, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  getCurrentData(id: any) {
    return this.httpClient.get<any>(`${environment.baseUrl}products/reviews/${id}`);
  }

  deleteReview(id: number, token: string) {
    token = 'token ' + token;
    return this.httpClient.delete(`${environment.baseUrl}products/reviews/${id}`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }
}
