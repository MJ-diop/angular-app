import { TestBed } from '@angular/core/testing';

import { StoresViewService } from './stores-view.service';

describe('StoresViewService', () => {
  let service: StoresViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoresViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
