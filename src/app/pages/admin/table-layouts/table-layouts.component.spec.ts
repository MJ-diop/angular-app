import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLayoutsComponent } from './table-layouts.component';

describe('TableLayoutsComponent', () => {
  let component: TableLayoutsComponent;
  let fixture: ComponentFixture<TableLayoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableLayoutsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
