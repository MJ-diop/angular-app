import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreReview } from 'src/app/models/store-review/store-review';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { StoreReviewService } from 'src/app/services/store-review/store-review.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-store-review',
  templateUrl: './update-store-review.component.html',
  styleUrls: ['./update-store-review.component.css'],
})
export class UpdateStoreReviewComponent implements OnInit {
  id: any;

  updateReviewForm = new FormGroup({
    title: new FormControl(''),
    comment: new FormControl(''),
    rating: new FormControl(''),
  });

  storeReview: StoreReview;
  currentUser: any;
  constructor(
    private storeReviewService: StoreReviewService,
    private authService: AuthenticationsService,
    public dialogRef: MatDialogRef<UpdateStoreReviewComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}

  ngOnInit(): void {
    this.id = this.data;
    this.currentUser = this.authService.currentUserValue;
    this.storeReviewService.getCurrentData(this.id).subscribe((res) => {
      this.updateReviewForm.patchValue({
        title: res.title,
        comment: res.comment,
        rating: res.rating,
      });
    });
  }

  onSubmit() {
    const storeReview = {
      id: this.id,
      title: this.updateReviewForm.get('title').value,
      comment: this.updateReviewForm.get('comment').value,
      rating: this.updateReviewForm.get('rating').value,
    };

    this.storeReviewService.updateReview(this.id, storeReview, this.currentUser.user.token).subscribe(
      (res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Review modified',
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload();
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.error,
        });
      }
    );
  }
}
