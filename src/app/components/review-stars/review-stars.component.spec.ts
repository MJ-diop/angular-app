import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewStarsComponent } from './review-stars.component';

describe('ReviewStarsComponent', () => {
  let component: ReviewStarsComponent;
  let fixture: ComponentFixture<ReviewStarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewStarsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewStarsComponent);
    component = fixture.componentInstance;
    // avoid errors in the template
    component.rating = 4;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should parse the rating', () => {
    expect(component.parseRating(4)).toBe(4);
  });

  it('get the yellow stars number', () => {
    expect(component.getCheckedRatingArray(4).length).toBe(4);
  });

  it('get the black stars number', () => {
    expect(component.getRatingArray(4).length).toBe(1);
  });
});
