/* eslint-disable @typescript-eslint/no-floating-promises */
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.scss'],
})
export class ReviewItemComponent implements OnInit {
  @ViewChild('effacerSwal', { static: false })
  private effacerSwal: SwalComponent;
  @Input() review: any;
  currentUser: any;
  users;
  @Output() btnDeleteReviewClick = new EventEmitter();
  @Output() btnUpdateReviewClick = new EventEmitter();

  constructor(private authService: AuthenticationsService) {}

  ngOnInit(): void {
    // this.currentUser = this.authService.currentUserValue;
    this.currentUser = localStorage.getItem('currentUser');
    const obj = this.currentUser;
    this.users = JSON.parse(obj);
  }

  onReviewUpdate() {
    this.btnUpdateReviewClick.emit('update review');
  }

  onReviewDelete() {
    this.effacerSwal.fire();
  }

  deleteReview() {
    this.btnDeleteReviewClick.emit('delete review');
  }
}
