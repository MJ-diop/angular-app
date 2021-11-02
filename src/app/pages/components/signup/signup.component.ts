/* eslint-disable @typescript-eslint/dot-notation */
// import { MustMatch } from 'src/app/_helpers/must-match.validator';
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { ConditionUsedComponent } from './../../user/condition-used/condition-used.component';
import { MatDialog } from '@angular/material/dialog';
import { Gender } from './../../../enums/gender.enum';
import { AccountType } from './../../../enums/account-type.enum';
import { HttpClient } from '@angular/common/http';
import { Auth, AuthResponded } from './../../../models/auth/auth';
import { SellersRegisterService } from './../../../services/sellers-register/sellers-register.service';
import { ActivatedRoute } from '@angular/router';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Router } from '@angular/router';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { User } from 'src/app/models/user/user';
import { Address } from 'src/app/models/address/address';
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable max-len */
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MustMatch } from 'src/app/_helpers/must-match.validator';

import { SocialAuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';
import { environment } from 'src/environments/environment';

import * as all from './../../../all.json';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public user: SocialUser = new SocialUser();
  signinForm: FormGroup;
  emailRegex = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  token: any;
  email: any;
  isActivated = false;
  resendLink = false;
  errorMessage: string;
  successMessage: string;
  loginForm: FormGroup;
  userResponded: AuthResponded;
  checked = false;
  regions = all['default'];

  constructor(
    private authService: AuthenticationsService,
    private sellersRegisterService: SellersRegisterService,
    private googleAuthService: SocialAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private http: HttpClient
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params.token) {
        this.email = params.email;
        this.token = params.token;
      } else {
        this.token = null;
      }
    });
  }

  ngOnInit(): void {
    console.dir(this.regions);
    console.dir(all['default'].name);
    // from google auth
    this.googleAuthService.authState.subscribe((user) => {
      this.user = user;
    });

    if (this.token !== null) {
      this.authService.verifyToken(this.token, this.email).subscribe(
        (data) => {
          if (Number(data.code) === 200) {
            this.isActivated = true;
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Account activated successfully, you can now log in',
              showConfirmButton: false,
              timer: 2500,
            });
            // this.successMessage = 'Account activated successfully, you can now log in';
          }
        },
        (error) => {
          this.resendLink = true;
          this.errorMessage = 'Token expired, could you register again';
        }
      );
    }

    this.signinForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
        tel: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipcode: ['', Validators.required],
        street: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
        password2: ['', Validators.required],
        checked: [true, Validators.required],
      },
      {
        validator: MustMatch('password', 'password2'),
      }
    );

    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      password: [null, Validators.required],
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConditionUsedComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  resend(): void {
    const email = {
      email: this.email,
    };
    this.authService.resend(email).subscribe(
      (data) => {
        if (data) {
          this.isActivated = true;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Check your mail to activate your account!',
            showConfirmButton: false,
            timer: 2000,
          });
        }
      },
      (error) => {
        this.resendLink = true;
        this.errorMessage = 'An error occured';
      }
    );
  }

  signin(): void {
    const username = this.signinForm.get('username').value;
    const typeUser = 'Seller';
    const email = this.signinForm.get('email').value;
    const phone = this.signinForm.get('tel').value;
    const city = this.signinForm.get('city').value;
    const fullname = '';
    const password = this.signinForm.get('password').value;
    const state = this.signinForm.get('state').value;
    const zipcode = this.signinForm.get('zipcode').value;
    const country = state;
    const street = this.signinForm.get('street').value;
    const gender = 'OTHERS';
    const checked = this.signinForm.get('checked').value;
    const address: Address = {
      state: state,
      zipcode: zipcode,
      country: country,
      street: street,
      phone: phone,
      city: city,
    };
    const user: User = {
      email: email,
      username: username,
      fullname: fullname,
      account_type: typeUser,
      gender: gender,
      address: address,
      password: password,
    };

    console.dir(user);

    if (!checked) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Accept conditions',
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      this.authService.register(user).subscribe(
        (response) => {
          console.log(response);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Check your mail to activate your account!',
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            this.router.navigate(['/home']);
          });
        },
        (error) => {
          if (error.status === 400) {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: error.error.errors.email,
              showConfirmButton: false,
              timer: 3000,
            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: error.error,
              showConfirmButton: false,
              timer: 2000,
            });
          }
        }
      );
    }
  }

  login(): void {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    const user: Auth = {
      email: email,
      password: password,
    };
    console.log(user);
    this.authService.login(user).subscribe(
      (data) => {
        // console.log(data);
        localStorage.setItem('currentUser', JSON.stringify(data));
        if (data['user'].account_type === 'Seller' || data['user'].account_type === 'SELLER') {
          this.router.navigate(['dashboard']).then(() => {
            window.location.reload();
          });
        } else {
          this.router.navigate(['profile']).then(() => {
            window.location.reload();
          });
        }
        this.userResponded = data;
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'User authenticated ',
          showConfirmButton: false,
          timer: 2000,
        });
        this.errorMessage = '';
      },
      (error) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error.errors.error,
          showConfirmButton: false,
          timer: 4000,
        });
      }
    );
  }

  loginWithGoogle(): void {
    console.log('worked !!!');
    this.googleAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (res) => {
        console.log(res);
        const tokenId = res.idToken;

        this.http
          .post<any>(`${environment.baseUrl}social_auth/google/`, { auth_token: tokenId })
          .subscribe(
            (data) => {
              console.log(data);
              localStorage.setItem('currentUser', JSON.stringify(data));
              this.router.navigate(['/profile']).then(() => {
                window.location.reload();
              });
            },
            (error) => {
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: error.detail,
                showConfirmButton: false,
                timer: 2000,
              });
            }
          );
      },
      (error) => {
        console.log(error);
        // Swal.fire({
        //   position: 'top-end',
        //   icon: 'success',
        //   title: error.detail,
        //   showConfirmButton: false,
        //   timer: 2000,
        // });
      }
    );
  }

  signInWithFB(): void {
    this.googleAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (res) => {
        const authToken = res.authToken;

        this.http
          .post<any>(`${environment.baseUrl}social_auth/facebook/`, { auth_token: authToken })
          .subscribe(
            (data) => {
              localStorage.setItem('currentUser', JSON.stringify(data));
              this.router.navigate(['/profile']).then(() => {
                window.location.reload();
              });
            },
            (error) => {
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: error.detail,
                showConfirmButton: false,
                timer: 2000,
              });
            }
          );
      },
      (error) => {
        console.log(error);
        // Swal.fire({
        //   position: 'top-end',
        //   icon: 'error',
        //   title: error.detail,
        //   showConfirmButton: false,
        //   timer: 2000,
        // });
      }
    );
  }
}
