/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient } from '@angular/common/http';
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable object-shorthand */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';

import { User } from 'src/app/models/user/user';
import { TranslateService } from '@ngx-translate/core';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { Auth, AuthResponded } from 'src/app/models/auth/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { Address } from 'src/app/models/address/address';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { ConditionUsedComponent } from '../condition-used/condition-used.component';

import { SocialAuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { environment } from 'src/environments/environment';

// import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public user: SocialUser = new SocialUser();

  remail: string;
  rpassword: string;
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  rcpassword: string;
  errorMessage: string;
  successMessage: string;
  errorResponse: any;
  loginForm: FormGroup;
  registerForm: FormGroup;
  emailRegex = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  userResponded: AuthResponded;
  isConnection = true;
  isInscription = false;
  listType = ['Seller', 'Customer'];
  listGender = ['M', 'F', 'OTHERS'];
  token: any;
  email: any;
  isActivated = false;
  resendLink = false;
  constructor(
    private authService: AuthenticationsService,
    private googleAuthService: SocialAuthService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
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
    // translate.setDefaultLang('de');
    // translate.use('de');
  }

  ngOnInit(): void {
    // from google auth
    this.googleAuthService.authState.subscribe((user) => {
      this.user = user;
    });

    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload');
      location.reload();
    } else {
      localStorage.removeItem('foo');
    }

    if (this.token !== null) {
      this.authService.verifyToken(this.token, this.email).subscribe(
        (data) => {
          if (Number(data.code) === 200) {
            this.isActivated = true;
            this.successMessage = 'Account activated successfully, you can now log in';
          }
        },
        (error) => {
          this.resendLink = true;
          this.errorMessage = 'Token expired, could you register again';
        }
      );
    }

    this.registerForm = this.formBuilder.group(
      {
        username: [null, Validators.required],
        email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
        typeUser: [null, Validators.required],
        gender: [null, Validators.required],
        state: [null, Validators.required],
        zipcode: [null, Validators.required],
        country: [null, Validators.required],
        street: [null, Validators.required],
        password: [null, [Validators.required, Validators.minLength(8)]],
        password2: [null, Validators.required],
        checked: [true, Validators.required],
      },
      {
        validator: MustMatch('password', 'password2'),
      }
    );
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      password: [null, Validators.required],
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConditionUsedComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  connexion() {
    this.isConnection = true;
    this.isInscription = false;
  }
  resend() {
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

  inscription() {
    this.isConnection = false;
    this.isInscription = true;
  }

  register() {
    const username = this.registerForm.get('username').value;
    const typeUser = this.registerForm.get('typeUser').value;
    const email = this.registerForm.get('email').value;
    const fullname = '';
    const password = this.registerForm.get('password').value;
    const state = this.registerForm.get('state').value;
    const zipcode = this.registerForm.get('zipcode').value;
    const country = this.registerForm.get('country').value;
    const street = this.registerForm.get('street').value;
    const gender = this.registerForm.get('gender').value;
    const checked = this.registerForm.get('checked').value;
    const address: Address = {
      state: state,
      zipcode: zipcode,
      country: country,
      street: street,
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
    if (!this.registerForm.valid) {
      return;
    }
    if (!checked) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Accept conditions',
        showConfirmButton: false,
        timer: 2000,
      });
      // this.errorMessage = 'Accept conditions';
    } else {
      this.authService.register(user).subscribe(
        (response) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Check your mail to activate your account!',
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            this.router.navigate(['/home']);
          });
          this.rpassword = '';
          this.rcpassword = '';
          this.remail = '';
        },
        (error) => {
          if (error.error.errors.email) {
            this.errorMessage = error.error.errors.email;
          } else {
            if (error.error.errors.username) {
              this.errorMessage = error.error.errors.username;
            }
          }
        }
      );
    }
  }

  login() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    const user: Auth = {
      email: email,
      password: password,
    };
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

        // this.successMessage = 'User authenticated ';
        this.errorMessage = '';
      },
      (error) => {
        // this.errorMessage = error.error.errors.error;
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
              this.router.navigate(['/profile']);
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
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.detail,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    );
  }

  signInWithFB() {
    this.googleAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (res) => {
        const authToken = res.authToken;

        this.http
          .post<any>(`${environment.baseUrl}social_auth/facebook/`, { auth_token: authToken })
          .subscribe(
            (data) => {
              localStorage.setItem('currentUser', JSON.stringify(data));
              this.router.navigate(['/profile']);
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
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.detail,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    );
  }

  signOut(): void {
    this.googleAuthService.signOut();
  }
}
