/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private http: HttpClient) {}

  getAllWishlist(token: any) {
    token = 'token ' + token;
    return this.http.get<any>(`${environment.baseUrl}wishlist`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  AddToWishlist(product: any, token: any) {
    token = 'token ' + token;
    return this.http.post<any>(`${environment.baseUrl}wishlist/items`, product, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  getProductsById(id: any) {
    return this.http.get<any>(`${environment.baseUrl}products/${id}`);
  }

  deletWishlist(id: any, token: any) {
    token = 'token ' + token;
    return this.http.delete<any>(`${environment.baseUrl}wishlist/items/${id}`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }
}
