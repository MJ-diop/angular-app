/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address/address';
import { AuthResponded } from 'src/app/models/auth/auth';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import Swal from 'sweetalert2';

import * as all from './../../../all.json';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
})
export class UpdateProfileComponent implements OnInit {
  errorMessage: string;
  successMessage: string = '';
  registerForm: FormGroup;
  currentUser: any;
  listGender = ['M', 'F', 'OTHERS'];
  gender = '';
  regions = all['default'];
  country;

  constructor(private authService: AuthenticationsService, private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    console.dir(this.regions);
    console.dir(all['default'].name);
    this.currentUser = this.authService.currentUserValue;
    console.log(this.currentUser.token);
    this.registerForm = this.formBuilder.group({
      username: [null, Validators.required],
      email: new FormControl({ value: '', disabled: true }),
      gender: [null, Validators.required],
      state: [null, Validators.required],
      zipcode: [null, Validators.required],
      country: [null, Validators.required],
      city: [null, Validators.required],
      street: [null, Validators.required],
      phone: [null, Validators.required],
      account_type: new FormControl({ value: '', disabled: true }),
    });

    this.authService.getUser(this.currentUser.token || this.currentUser['user'].token).subscribe((data) => {
      // console.dir(data.body);
      this.country = data.body['user'].address.country;

      const user: AuthResponded = data.body;
      this.registerForm.patchValue({
        username: user['user'].username,
        email: user['user'].email,
        gender: user['user'].gender,
        state: user['user'].address.state,
        zipcode: user['user'].address.zipcode,
        country: user['user'].address.country,
        phone: user['user'].address.phone,
        street: user['user'].address.street,
        account_type: user['user'].account_type,
      });
    });
  }
  update() {
    const username = this.registerForm.get('username').value;
    const sexe = this.registerForm.get('gender').value;
    const state = this.registerForm.get('country').value;
    const zipcode = this.registerForm.get('zipcode').value;
    const country = this.registerForm.get('city').value;
    const street = this.registerForm.get('street').value;
    const phone = this.registerForm.get('phone').value;
    const address: Address = {
      state: state,
      zipcode: zipcode,
      country: country,
      street: street,
      phone: phone,
    };
    const user = {
      username: username,
      gender: sexe,
      address: address,
    };
    console.dir(user);
    this.authService.update(user, this.currentUser.token || this.currentUser['user'].token).subscribe(
      (data) => {
        console.log('update ', data);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your profile has been successfully updated!',
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          this.router.navigate(['/profile']);
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.errors.username[0],
        });
      }
    );
  }
}
