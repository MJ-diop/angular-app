import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-pass-email',
  templateUrl: './reset-pass-email.component.html',
  styleUrls: ['./reset-pass-email.component.scss'],
})
export class ResetPassEmailComponent implements OnInit {
  resetForm: FormGroup;
  emailRegex = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  errorMessage: string;
  successMessage: string;
  errorResponse: any;
  isReset = false;
  token: any;
  uuid: any;

  constructor(
    private authService: AuthenticationsService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.token = this.router.snapshot.params.token;
    this.uuid = this.router.snapshot.params.uidb64;
    console.log(this.token);
    if (this.token && this.uuid) {
      this.isReset = true;
    }
    this.resetForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      // password: [null, Validators.required],
    });
  }

  reset() {
    const mail = this.resetForm.get('email').value;
    const email = {
      email: mail,
    };
    this.authService.getEmailToResetPassword(email).subscribe(
      (data) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'We have sent you a link to reset your password',
          showConfirmButton: true,
          // timer: 1500,
        });
        console.log(data);
        // this.successMessage = 'User authenticated ';
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error,
        });
        console.log(error);
        this.errorMessage = 'Username/Password not correct';
      }
    );
  }
}
