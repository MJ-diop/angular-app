import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductReview } from 'src/app/models/product-review/product-review';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { ProductReviewService } from 'src/app/services/product-review/product-review.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-product-review',
  templateUrl: './update-product-review.component.html',
  styleUrls: ['./update-product-review.component.css'],
})
export class UpdateProductReviewComponent implements OnInit {
  id: any;

  updateReviewForm = new FormGroup({
    title: new FormControl(''),
    comment: new FormControl(''),
    rating: new FormControl(''),
  });

  productReview: ProductReview;
  currentUser: any;
  constructor(
    private productReviewService: ProductReviewService,
    private authService: AuthenticationsService,
    public dialogRef: MatDialogRef<UpdateProductReviewComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}

  ngOnInit(): void {
    this.id = this.data;
    this.currentUser = this.authService.currentUserValue;
    this.productReviewService.getCurrentData(this.id).subscribe((res) => {
      this.updateReviewForm.patchValue({
        title: res.title,
        comment: res.comment,
        rating: res.rating,
      });
    });
  }

  onSubmit() {
    const productReview = {
      id: this.id,
      title: this.updateReviewForm.get('title').value,
      comment: this.updateReviewForm.get('comment').value,
      rating: this.updateReviewForm.get('rating').value,
    };

    this.productReviewService.updateReview(this.id, productReview, this.currentUser.user.token).subscribe(
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
