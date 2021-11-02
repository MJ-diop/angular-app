import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleRegionComponent } from './single-region.component';

describe('SingleRegionComponent', () => {
  let component: SingleRegionComponent;
  let fixture: ComponentFixture<SingleRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleRegionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
