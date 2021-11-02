import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubSectionComponent } from './pub-section.component';

describe('PubSectionComponent', () => {
  let component: PubSectionComponent;
  let fixture: ComponentFixture<PubSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PubSectionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PubSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
