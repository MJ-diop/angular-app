import { TestBed } from '@angular/core/testing';

import { SellersRegisterService } from './sellers-register.service';

describe('SellersRegisterService', () => {
  let service: SellersRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellersRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
