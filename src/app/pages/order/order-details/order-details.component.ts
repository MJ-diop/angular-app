import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { I18nServiceService } from 'src/app/services/i18n-service/i18n-service.service';
import { OrderService } from 'src/app/services/order/order.service';
import Swal from 'sweetalert2';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  @ViewChild('effacerSwal', { static: false })
  private effacerSwal: SwalComponent;
  idOrder: any;
  currentUser: any;
  order: any;
  token: any;
  total = 0;
  id: any;
  constructor(
    private router: ActivatedRoute,
    private orderService: OrderService,
    private i18nServiceService: I18nServiceService,
    private authService: AuthenticationsService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.token = this.currentUser.token || this.currentUser['user'].token;
    this.idOrder = this.router.snapshot.params.id;
    this.getOrder();
  }

  getOrder() {
    this.orderService.getOrder(this.idOrder, this.token).subscribe(
      (data) => {
        console.log(data.body);
        this.order = data.body;
        this.total = Number(this.order.total_tax) + Number(this.order.shipping_tax) + Number(this.order.total_prices);
      },
      (error) => {}
    );
  }

  onCancel() {
    console.log(this.id);
    this.orderService.deleteOrder(this.id, this.currentUser.token || this.currentUser['user'].token).subscribe(
      (res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Order has been canceled`,
          showConfirmButton: false,
          timer: 3000,
        });

        window.location.reload();
      },
      (error) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    );
  }

  CancelBtn(id) {
    this.effacerSwal.fire();
    this.id = id;
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
}
