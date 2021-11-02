import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShippingAddress } from 'src/app/models/shipping-address/shipping-address';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { ShippingAdressService } from 'src/app/services/shipping-adress/shipping-adress.service';

@Component({
  selector: 'app-shipping-adress',
  templateUrl: './shipping-adress.component.html',
  styleUrls: ['./shipping-adress.component.scss'],
})
export class ShippingAdressComponent implements OnInit {
  shippingAdresses: [];
  currentUser: any;
  token: any;

  constructor(private shippingAdressService: ShippingAdressService, private authService: AuthenticationsService) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    this.token = this.currentUser.token || this.currentUser['user'].token;
  }
}
