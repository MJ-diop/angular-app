import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoyDetailComponent } from './categoy-detail.component';

describe('CategoyDetailComponent', () => {
  let component: CategoyDetailComponent;
  let fixture: ComponentFixture<CategoyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoyDetailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
