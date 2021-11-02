import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { MockAuthService } from 'src/app/services/authentications/authentications.service.spec';

import { OrderListComponent } from './order-list.component';

describe('OrderListComponent', () => {
  let component: OrderListComponent;
  let fixture: ComponentFixture<OrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), HttpClientModule],
      declarations: [OrderListComponent],
      providers: [{ provide: AuthenticationsService, useClass: MockAuthService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListComponent);
    component = fixture.componentInstance;
    component.listOrders = [
      {
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
      },
      {
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
          name: 'UPS',
        },
        order_items: [
          {
            cart_item: {
              product: {
                price: 199,
                name: 'Sony PS4 slim',
                images: [{ file: 'image 0' }],
              },
            },
          },
          {
            cart_item: {
              product: {
                price: 299,
                name: 'Microsoft XBOX One S',
                images: [{ file: 'image 1' }],
              },
            },
          },
        ],
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the current user', () => {
    expect(component.currentUser.user.username).toBe('Mouhamed');
    expect(component.token).toBe('abcdef');
    expect(component.typeUser).toBe(1);
    expect(component.isSeller).toBe(false);
  });
});
