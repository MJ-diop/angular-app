import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-checkout',
  templateUrl: './article-checkout.component.html',
  styleUrls: ['./article-checkout.component.scss'],
})
export class ArticleCheckoutComponent implements OnInit {
  selected = '1';

  price = '100';
  shop = 'Adidas';
  products = [
    {
      name: 'Tropical Necklace ',
      price: 80,
      shop: 'Wassa',
      img: '../../../assets/img/Products/4.png',
    },
    {
      name: 'African Necklace Wax',
      price: 60,
      shop: 'Bana',
      img: '../../../assets/img/Products/5.png',
    },
    {
      name: 'Boho Stone Necklace',
      price: 145,
      shop: 'Ikobi',
      img: '../../../assets/img/Products/7.png',
    },
  ];

  constructor() {}

  ngOnInit() {
    console.table(this.products);
  }
}
