import { TestBed } from '@angular/core/testing';

import { NotConnectedGuard } from './not-connected.guard';

describe('NotConnectedGuard', () => {
  let guard: NotConnectedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotConnectedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
