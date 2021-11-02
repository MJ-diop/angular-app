import { TestBed } from '@angular/core/testing';
import { first } from 'rxjs/operators';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { MockAuthService } from 'src/app/services/authentications/authentications.service.spec';

import { ReviewItemComponent } from './review-item.component';

describe('ReviewItemComponent', () => {
  let component: any;
  let authService: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ReviewItemComponent, { provide: AuthenticationsService, useClass: MockAuthService }],
      declarations: [ReviewItemComponent],
    }).compileComponents();

    component = TestBed.inject(ReviewItemComponent);
    authService = TestBed.inject(AuthenticationsService);
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should get the current user', () => {
    component.ngOnInit();
    expect(component.currentUser.user.username).toBe('Mouhamed');
  });

  it('should emit an update review event', () => {
    component.btnUpdateReviewClick.pipe(first()).subscribe((value: string) => {
      expect(value).toBe('update review');
    });
    component.onReviewUpdate();
  });

  it('should emit an delete review event', () => {
    component.btnDeleteReviewClick.pipe(first()).subscribe((value: string) => {
      expect(value).toBe('delete review');
    });
    component.onReviewDelete();
  });
});
