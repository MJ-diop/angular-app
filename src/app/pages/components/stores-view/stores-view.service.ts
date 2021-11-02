/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StoresViewService {
  constructor(private http: HttpClient) {}

  getAllStores() {
    return this.http.get<any>(`${environment.baseUrl}stores`);
  }
}
