import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPassEmailComponent } from './reset-pass-email.component';

describe('ResetPassEmailComponent', () => {
  let component: ResetPassEmailComponent;
  let fixture: ComponentFixture<ResetPassEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResetPassEmailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPassEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
