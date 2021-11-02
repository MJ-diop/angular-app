import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { MockAuthService } from 'src/app/services/authentications/authentications.service.spec';
import { CartService } from 'src/app/services/cart/cart.service';
import { I18nServiceService } from 'src/app/services/i18n-service/i18n-service.service';

import { OrderItemComponent } from './order-item.component';

class MockI18nService {
  currentLangValue: 'fr';
}

describe('OrderItemComponent', () => {
  let component: OrderItemComponent;
  let fixture: ComponentFixture<OrderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), HttpClientModule, AppRoutingModule],
      providers: [
        { provide: AuthenticationsService, useClass: MockAuthService },
        { provide: I18nServiceService, useClass: MockI18nService },
        { provide: CartService },
      ],
      declarations: [OrderItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemComponent);
    component = fixture.componentInstance;
    component.order = {
      total_prices: 898,
      shipping_address: {
        address: {
          country: 'Senegal',
          state: 'Senegal',
          street: 'YF rue 00',
          phone_number: '0000',
        },
      },
      shipping_method: {
        name: 'Fedex',
      },
      order_items: [
        {
          cart_item: {
            product: {
              price: 399,
              name: 'Sony PS5',
              images: [{ file: 'image 0' }],
            },
          },
        },
        {
          cart_item: {
            product: {
              price: 499,
              name: 'Microsoft XBOX One X',
              images: [{ file: 'image 1' }],
            },
          },
        },
      ],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read the order', () => {
    expect(component.orderItem).toBe(component.order.order_items[0]);
  });

  it('should format the price', () => {
    expect(component.formatPrice('1852.23')).toBe('1852,23');
  });

  it('should navigate through the order items', () => {
    let index = component.index;
    component.next();
    expect(component.index).toBe(index + 1);
    expect(component.orderItem).toBe(component.order.order_items[component.index]);
    component.previous();
    expect(component.index).toBe(index);
    expect(component.orderItem).toBe(component.order.order_items[component.index]);
  });
});
