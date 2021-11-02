import { Injectable } from '@angular/core';
import { StoreReview } from 'src/app/models/store-review/store-review';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class StoreReviewService {
  constructor(private httpClient: HttpClient) {}

  addReview(storeReview: StoreReview, token: string) {
    token = 'token ' + token;
    return this.httpClient.post(`${environment.baseUrl}stores/reviews`, storeReview, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  updateReview(id: number, data: any, token: string) {
    token = 'token ' + token;
    return this.httpClient.put<any>(`${environment.baseUrl}stores/reviews/${id}`, data, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  getCurrentData(id: any) {
    return this.httpClient.get<any>(`${environment.baseUrl}stores/reviews/${id}`);
  }

  deleteReview(id: number, token: string) {
    token = 'token ' + token;
    return this.httpClient.delete(`${environment.baseUrl}stores/reviews/${id}`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }
}
