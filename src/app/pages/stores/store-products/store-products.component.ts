/* eslint-disable @typescript-eslint/no-floating-promises */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { StoreReviewService } from 'src/app/services/store-review/store-review.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import Swal from 'sweetalert2';
import { StoreReviewComponent } from '../store-review/store-review/store-review.component';
import { UpdateStoreReviewComponent } from '../store-review/update-store-review/update-store-review.component';

@Component({
  selector: 'app-store-products',
  templateUrl: './store-products.component.html',
  styleUrls: ['./store-products.component.scss'],
})
export class StoreProductsComponent implements OnInit {
  products = [];
  produits1 = [];
  idStore: any;
  storeName: any;
  rating: any;
  reviews: any;
  currentUser: any;

  constructor(
    private storesService: StoresService,
    public cartService: CartService,
    private router: ActivatedRoute,
    public editDialog: MatDialog,
    private authService: AuthenticationsService,
    private storeReviewService: StoreReviewService,
    public addDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.idStore = '';
    this.idStore = this.router.snapshot.params.id;
    this.storesService.getCurrentData(this.idStore).subscribe(
      (data) => {
        this.storeName = data.name;
        this.rating = data.rating;
        this.products = data.products;
        this.produits1 = this.products.slice(0, 2);
        this.reviews = data.reviews;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: error.error,
          text: 'Something went wrong!',
        });
      }
    );
  }

  addToCart(id: Number) {
    this.cartService.AddProductToCart(id);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Quantity not available!',
      showConfirmButton: false,
      timer: 2000,
    });
  }

  updateReview(id) {
    const dialogRef = this.editDialog.open(UpdateStoreReviewComponent, { width: '600px', data: id });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${id}`);
    });
  }
  deleteReview(id) {
    this.storeReviewService.deleteReview(id, this.currentUser.user.token).subscribe((res) => {});
    window.location.reload();
  }

  addReview(id: any) {
    const dialogRef = this.addDialog.open(StoreReviewComponent, { width: '600px', data: id });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${id}`);
    });
  }
}
