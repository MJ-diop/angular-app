/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ProductsService } from './../../../services/products/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { I18nServiceService } from 'src/app/services/i18n-service/i18n-service.service';
uuidv4();
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit {
  currentUser: any;
  updateProducts = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl(''),
    // img: new FormControl(''),
    is_active: new FormControl(''),
  });

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private productsService: ProductsService,
    private authService: AuthenticationsService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.productsService.getCurrentData(this.router.snapshot.params.id).subscribe((res) => {
      console.log(res);
      this.updateProducts = new FormGroup({
        name: new FormControl(res.name),
        description: new FormControl(res.description),
        price: new FormControl(Number(res.price)),
        quantity: new FormControl(res.quantity),
        // img: new FormControl(res.image),
        is_active: new FormControl(res.is_active),
      });
    });
  }

  // checkCheckBoxvalue(event) {
  //   console.log(event.checked);
  // }

  onSubmit() {
    const name = this.updateProducts.get('name').value;
    const description = this.updateProducts.get('description').value;
    const price = this.updateProducts.get('price').value;
    const is_active = this.updateProducts.get('is_active').value;
    const quantity = this.updateProducts.get('quantity').value;
    // const image = this.updateProducts.get('img').value;
    const product = {
      id: this.router.snapshot.params.id,
      name: name,
      description: description,
      price: price,
      is_active: is_active,
      quantity: quantity,
      // image: image,
    };
    this.productsService.updateProduct(this.router.snapshot.params.id, product, this.currentUser.user.token).subscribe(
      (res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Product modified',
          showConfirmButton: false,
          timer: 1500,
        });
        this.route.navigate(['/products']);
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    );
  }
}
