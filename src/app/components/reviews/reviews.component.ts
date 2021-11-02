import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StoreReviewComponent } from '../../pages/stores/store-review/store-review/store-review.component';
import { UpdateStoreReviewComponent } from '../../pages/stores/store-review/update-store-review/update-store-review.component';
import { StoreReviewService } from 'src/app/services/store-review/store-review.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { I18nServiceService } from 'src/app/services/i18n-service/i18n-service.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  @Input() reviews: any;
  @Input() rating: any;
  @Input() id: any;

  @Output() reviewAdd = new EventEmitter();
  @Output() reviewEdit = new EventEmitter();
  @Output() reviewDelete = new EventEmitter();

  currentUser: any;
  idStore: any;
  constructor(private i18nServiceService: I18nServiceService, private authService: AuthenticationsService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
  }

  onReviewAdd(): void {
    this.reviewAdd.emit('add review');
  }

  onReviewEdit(id): void {
    this.reviewEdit.emit(id);
  }

  onReviewDelete(id): void {
    this.reviewDelete.emit(id);
  }
}
