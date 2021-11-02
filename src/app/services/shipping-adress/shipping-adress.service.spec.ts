/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ShippingAdressService } from './shipping-adress.service';

describe('Service: ShippingAdress', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShippingAdressService],
    });
  });

  it('should ...', inject([ShippingAdressService], (service: ShippingAdressService) => {
    expect(service).toBeTruthy();
  }));
});
