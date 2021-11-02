import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxLayoutsComponent } from './box-layouts.component';

describe('BoxLayoutsComponent', () => {
  let component: BoxLayoutsComponent;
  let fixture: ComponentFixture<BoxLayoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoxLayoutsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
