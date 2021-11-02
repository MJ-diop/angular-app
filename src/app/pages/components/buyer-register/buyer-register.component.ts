import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { SellersRegisterService } from './../../../services/sellers-register/sellers-register.service';
import { AuthenticationsService } from './../../../services/authentications/authentications.service';
import { Auth, AuthResponded } from './../../../models/auth/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SocialUser, SocialAuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/dot-notation */
// import { MustMatch } from 'src/app/_helpers/must-match.validator';
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { ConditionUsedComponent } from '../../user/condition-used/condition-used.component';
import Swal from 'sweetalert2';
import { Address } from 'src/app/models/address/address';
import { User } from 'src/app/models/user/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-buyer-register',
  templateUrl: './buyer-register.component.html',
  styleUrls: ['./buyer-register.component.scss'],
})
export class BuyerRegisterComponent implements OnInit {
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
    const typeUser = 'Customer';
    const email = this.signinForm.get('email').value;
    const fullname = '';
    const password = this.signinForm.get('password').value;
    const state = 'your address';
    const zipcode = 'your address';
    const country = 'your address';
    const street = 'your address';
    const gender = 'OTHERS';
    const checked = this.signinForm.get('checked').value;
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
            window.location.reload();
            // this.router.navigate(['/profile']);
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
