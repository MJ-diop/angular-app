import { TestBed } from '@angular/core/testing';

import { AdminProductDetailService } from './admin-product-detail.service';

describe('AdminProductDetailService', () => {
  let service: AdminProductDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminProductDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
