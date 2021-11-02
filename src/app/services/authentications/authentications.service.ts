/* eslint-disable @typescript-eslint/no-floating-promises */
import { Router } from '@angular/router';
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth, AuthResponded } from 'src/app/models/auth/auth';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationsService {
  // private currentUserSubject = localStorage.getItem('currentUser');
  // public currentUserWithNormalLogin: Observable<AuthResponded>;

  public currentUser = localStorage.getItem('currentUser');
  obj = this.currentUser;
  users = JSON.parse(this.obj);

  constructor(private httpClient: HttpClient, private router: Router, private cookieService: CookieService) {
    // if (cookieService.check('currentUser')) {
    //   this.currentUserSubject = new BehaviorSubject<AuthResponded>(JSON.parse(this.cookieService.get('currentUser')));
    // } else {
    //   this.currentUserSubject = new BehaviorSubject<null>(null);
    // }
    // this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.users;
  }

  // Authentication

  login(user: Auth) {
    return this.httpClient.post<AuthResponded>(`${environment.baseUrl}users/login`, user).pipe(
      map((userResponded) => {
        // login successful if there's a jwt token in the response
        if (userResponded) {
          // this.cookieService.set('currentUser', JSON.stringify(userResponded));
          localStorage.setItem('currentUser', JSON.stringify(userResponded));
          // this.currentUserSubject.next(userResponded);
        }
        return userResponded;
      })
    );
  }

  // Get user authenticated
  getUser(token: string) {
    token = 'token ' + token;
    return this.httpClient
      .get<AuthResponded>(`${environment.baseUrl}users`, {
        headers: new HttpHeaders().set('Authorization', token),
        observe: 'response',
      })
      .pipe(map((userResponded) => userResponded));
  }

  // Get user by id
  getUserById(id: string, token: string) {
    token = 'token ' + token;
    return this.httpClient
      .get<AuthResponded>(`${environment.baseUrl}users/${id}`, {
        headers: new HttpHeaders().set('Authorization', token),
        observe: 'response',
      })
      .pipe(map((userResponded) => userResponded));
  }

  // Update User Profile

  update(username: any, token: string) {
    token = 'token ' + token;
    return this.httpClient.put(`${environment.baseUrl}users`, username, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  // User Registration

  register(user: User) {
    return this.httpClient.post<any>(`${environment.baseUrl}users/register/`, user);
  }

  // Verify token

  verifyToken(token: any, email: any) {
    return this.httpClient.get<any>(`${environment.baseUrl}users/verify/?token=` + token + `&email=` + email);
  }

  // Resend mail

  resend(email: any) {
    return this.httpClient.post<any>(`${environment.baseUrl}users/resend/`, email);
  }

  // User Logout
  logOut() {
    this.cookieService.delete('currentUser');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
    // this.currentUserSubject.next(null);
  }

  // Password reset
  getEmailToResetPassword(email: any) {
    return this.httpClient.post<any>(`${environment.baseUrl}users/password/reset/`, email);
  }

  resetPassword(value: any) {
    return this.httpClient.patch<any>(`${environment.baseUrl}users/password/reset/complete/`, value);
  }
}
