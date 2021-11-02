import { ComponentFixture, TestBed } from '@angular/core/testing';
import { first } from 'rxjs/internal/operators/first';

import { ReviewsStatsComponent } from './reviews-stats.component';

describe('ReviewsStatsComponent', () => {
  let component: ReviewsStatsComponent;
  let fixture: ComponentFixture<ReviewsStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewsStatsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsStatsComponent);
    component = fixture.componentInstance;
    component.reviews = [{ rating: 3 }, { rating: 1 }, { rating: 4 }];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an add review event', () => {
    component.btnAddReviewClick.pipe(first()).subscribe((value: string) => {
      expect(value).toBe('add review');
    });
    component.onClick();
  });

  it('should get the rating stats', () => {
    expect(component.ratings).toEqual([1, 0, 1, 1, 0]);
  });
});
