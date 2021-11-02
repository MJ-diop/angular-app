import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss'],
})
export class OrderStatusComponent implements OnInit {
  @Input() status;
  progressValue: number;

  constructor() {}

  ngOnInit(): void {
    switch (this.status) {
      case 'canceled':
        this.progressValue = 0;
      case 'initiated':
        this.progressValue = 25;
        break;
      case 'confirmed':
        this.progressValue = 50;
        break;
      case 'shipping':
        this.progressValue = 75;
        break;
      case 'delivered':
        this.progressValue = 100;
        break;
      default:
        break;
    }
  }
}
