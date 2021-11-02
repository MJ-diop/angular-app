import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Newsletter } from '../../models/newsletter/newsletter';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class NewsletterService {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<any>(`${environment.baseUrl}newsletter`);
  }

  addEmail(email: any) {
    return this.httpClient.post<any>(`${environment.baseUrl}newsletter`, { email });
  }
}
