import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReloadRouteComponent } from './reload-route.component';

describe('ReloadRouteComponent', () => {
  let component: ReloadRouteComponent;
  let fixture: ComponentFixture<ReloadRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReloadRouteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReloadRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
