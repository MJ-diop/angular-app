import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StoreReview } from 'src/app/models/store-review/store-review';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { StoreReviewService } from 'src/app/services/store-review/store-review.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-store-review',
  templateUrl: './store-review.component.html',
  styleUrls: ['./store-review.component.css'],
})
export class StoreReviewComponent implements OnInit {
  createReviewForm: FormGroup;
  currentUser: any;
  id: any;

  constructor(
    private formBuilder: FormBuilder,
    private storeReviewService: StoreReviewService,
    private authService: AuthenticationsService,
    public dialogRef: MatDialogRef<StoreReviewComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}

  ngOnInit(): void {
    this.id = this.data;
    this.currentUser = this.authService.currentUserValue;
    this.createReviewForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      comment: [null, Validators.required],
      rating: [null, Validators.required],
    });
  }

  onSubmit() {
    const review = new StoreReview();

    review.title = this.createReviewForm.get('title').value;
    review.comment = this.createReviewForm.get('comment').value;
    review.rating = this.createReviewForm.get('rating').value;
    review.store = this.id;

    this.storeReviewService.addReview(review, this.currentUser.user.token).subscribe(
      (res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your review has been added',
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
