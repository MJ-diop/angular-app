import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { I18nServiceService } from 'src/app/services/i18n-service/i18n-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent implements OnInit {
  @Input() order: any;
  orderItem: any;
  product: any;
  user: any;
  index: number = 0;

  constructor(
    private cartService: CartService,
    private authService: AuthenticationsService,
    private i18nServiceService: I18nServiceService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    this.user = this.user.user;
    this.orderItem = this.order.order_items[this.index];
    this.product = this.orderItem?.cart_item.product;
  }

  formatPrice(price: any) {
    var prices = price.split('.');
    if (this.i18nServiceService.currentLangValue === null || this.i18nServiceService.currentLangValue === 'en') {
      prices = price;
    } else {
      prices = prices[0] + ',' + prices[1];
      if (prices.split(',').length > 2) {
        prices = prices.split(',')[0] + '' + prices.split(',')[1] + ',' + prices.split(',')[2];
      }
    }
    return prices;
  }

  next() {
    this.index++;
    this.ngOnInit();
  }

  previous() {
    this.index--;
    this.ngOnInit();
  }

  addToCart(id: Number) {
    this.cartService.AddProductToCart(id);
    Swal.fire({
      // position: 'top-end',
      icon: 'success',
      title: 'Product added to cart!',
      showConfirmButton: false,
      timer: 2000,
    });
  }
}
