/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ShippingAdressComponent } from './shipping-adress.component';

describe('ShippingAdressComponent', () => {
  let component: ShippingAdressComponent;
  let fixture: ComponentFixture<ShippingAdressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShippingAdressComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingAdressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
