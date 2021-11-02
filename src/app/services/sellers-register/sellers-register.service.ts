import { HttpHeaders } from '@angular/common/http';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { User } from './../../models/user/user';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountType } from 'src/app/enums/account-type.enum';

@Injectable({
  providedIn: 'root',
})
export class SellersRegisterService {
  constructor(private http: HttpClient) {}

  // register(seller: User) {
  //   return this.http.post<any>(`${environment.baseUrlTestSellerRegister}users/seller-register`, seller);
  // }

  // updateUserType(user: any, token: string) {
  //   token = 'token ' + token;
  //   return this.http.put(`${environment.baseUrlTestSellerRegister}users/become-seller`, user, {
  //     headers: new HttpHeaders().set('Authorization', token),
  //     observe: 'response',
  //   });
  // }
}
