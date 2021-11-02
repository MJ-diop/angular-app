import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingShareButtonComponent } from './floating-share-button.component';

describe('FloatingShareButtonComponent', () => {
  let component: FloatingShareButtonComponent;
  let fixture: ComponentFixture<FloatingShareButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FloatingShareButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingShareButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
