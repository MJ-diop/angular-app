import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionUsedComponent } from './condition-used.component';

describe('ConditionUsedComponent', () => {
  let component: ConditionUsedComponent;
  let fixture: ComponentFixture<ConditionUsedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConditionUsedComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionUsedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
