import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-reviews-stats',
  templateUrl: './reviews-stats.component.html',
  styleUrls: ['./reviews-stats.component.scss'],
})
export class ReviewsStatsComponent implements OnInit {
  @Input() reviews: any;
  ratings: number[] = [0, 0, 0, 0, 0];
  @Output() btnAddReviewClick = new EventEmitter();
  @Input() id: any;

  hasOrdered = false;
  listOrders = [];
  listOrder = [];
  currentUser: any;
  token: any;
  showSpinner = true;
  typeUser: any;
  isSeller = false;
  storeProducts = [];
  url: any;
  constructor(
    private orderService: OrderService,
    private authService: AuthenticationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;

    this.url = this.router.url;

    this.reviews.map((review) => {
      this.ratings[review.rating - 1]++;
    });

    this.getOrderedProducts();
  }

  onClick() {
    this.btnAddReviewClick.emit('add review');
  }

  getOrderedProducts() {
    this.orderService.getAllOrders(this.currentUser.token || this.currentUser['user'].token).subscribe(
      (data) => {
        // console.dir(data.body);
        this.listOrders = data.body;
        this.listOrders.forEach((order) => {
          order.order_items.forEach((items) => {
            this.listOrder.push(items);
            this.listOrder.forEach((item) => {
              if (this.url.includes('product-detail')) {
                if (item.cart_item['product'].id === this.id) {
                  this.hasOrdered = true;
                }
              } else if (this.url.includes('store-products')) {
                if (item.cart_item['product'].store === this.id) {
                  this.hasOrdered = true;
                }
              }
            });
          });
        });
        this.showSpinner = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
