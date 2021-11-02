import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStoreReviewComponent } from './update-store-review.component';

describe('UpdateStoreReviewComponent', () => {
  let component: UpdateStoreReviewComponent;
  let fixture: ComponentFixture<UpdateStoreReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateStoreReviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStoreReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
