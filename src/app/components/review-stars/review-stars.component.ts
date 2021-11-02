import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-stars',
  templateUrl: './review-stars.component.html',
  styleUrls: ['./review-stars.component.css'],
})
export class ReviewStarsComponent implements OnInit {
  @Input() rating: any;

  constructor() {}

  ngOnInit(): void {}

  getRatingArray(rating: any) {
    return [...Array(5 - Math.floor(Number(rating))).keys()];
  }

  getCheckedRatingArray(rating: any) {
    return [...Array(Math.floor(Number(rating))).keys()];
  }
  parseRating(rating: any) {
    return Math.floor(rating);
  }
}
