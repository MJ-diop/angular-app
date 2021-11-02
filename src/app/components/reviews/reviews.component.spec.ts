import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { first } from 'rxjs/operators';
import { I18nServiceService } from 'src/app/services/i18n-service/i18n-service.service';

import { ReviewsComponent } from './reviews.component';

describe('ReviewsComponent', () => {
  let component: ReviewsComponent;
  let fixture: ComponentFixture<ReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, TranslateModule.forRoot()],
      declarations: [ReviewsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsComponent);
    component = fixture.componentInstance;
    fixture.debugElement.injector.get(I18nServiceService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an add review event', () => {
    component.reviewAdd.pipe(first()).subscribe((value: string) => {
      expect(value).toBe('add review');
    });
    component.onReviewAdd();
  });

  it('should emit an update review event', () => {
    component.reviewEdit.pipe(first()).subscribe((value: number) => {
      expect(value).toBe(1);
    });
    component.onReviewEdit(1);
  });

  it('should emit an delete review event', () => {
    component.reviewDelete.pipe(first()).subscribe((value: number) => {
      expect(value).toBe(2);
    });
    component.onReviewDelete(2);
  });
});
