import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStoresComponent } from './create-stores.component';

describe('CreateStoresComponent', () => {
  let component: CreateStoresComponent;
  let fixture: ComponentFixture<CreateStoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateStoresComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
