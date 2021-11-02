import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreReviewComponent } from './store-review.component';

describe('StoreReviewComponent', () => {
  let component: StoreReviewComponent;
  let fixture: ComponentFixture<StoreReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoreReviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
