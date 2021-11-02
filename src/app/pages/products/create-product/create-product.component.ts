/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/unbound-method */
import { Router } from '@angular/router';
import { ProductsService } from './../../../services/products/products.service';
import { Products } from './../../../models/products/products';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Category } from 'src/app/models/category/category';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { Parcel } from 'src/app/models/parcel/parcel';
uuidv4();

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  createProductForm: FormGroup;
  categorys: Category;
  stores = [];
  products = [];
  currentUser: any;
  categoryId: any;
  storeId: any;
  images = [];
  imagesTable = [];
  productId: any;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  default_dist_unit = 'Choose distance unit';
  // eslint-disable-next-line @typescript-eslint/naming-convention
  default_mass_unit = 'Choose mass unit';
  filePath = './../../assets/img/Products/';

  imgSrc: File = null;

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private categoryService: CategoriesService,
    private storesService: StoresService,
    private productsService: ProductsService,
    private authService: AuthenticationsService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.createProductForm = this.fb.group({
      name: ['', Validators.required],
      slug: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],

      category: ['', Validators.required],
      store: ['', Validators.required],
      length: [''],
      width: [''],
      weight: [''],
      height: [''],
      distance_unit: [''],
      mass_unit: [''],
      pictures: this.fb.array([]),
    });

    this.getProducts();
    this.getCategory();
    this.getStores();
  }

  pictures(): FormArray {
    return this.createProductForm.get('pictures') as FormArray;
  }

  newImage(): FormGroup {
    return this.fb.group({
      img: '',
    });
  }

  addImage() {
    this.pictures().push(this.newImage());
  }

  removeImage(i: number) {
    this.pictures().removeAt(i);
    this.imagesTable.splice(i, 1);
  }

  handleFileInput(event) {
    const file = <File>event.target.files[0];
    // for (let file of files) {
    let fileName = file.name;
    if (file.size > 10485760) {
      return false;
    }
    if (fileName) {
      fileName = fileName.replace(/[^a-zA-Z0-9\.\-]/g, '_');
    }
    this.imagesTable.push(file);
  }

  checkCheckBoxvalue(event) {}

  getProducts() {
    this.productsService.getAllProducts().subscribe((data) => {
      this.products = data.results;
    });
  }

  getCategory() {
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categorys = data.results;
    });
  }

  getStores() {
    this.storesService.getSellerStore(this.currentUser.user.token).subscribe(
      (res) => {
        this.stores = res.body.results;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  categoryEvent(event) {
    this.categoryId = event.target.value;
  }

  storeEvent(event) {
    this.storeId = event.target.value;
  }

  onSubmit() {
    // products.image = this.createProductForm.get('image').value;

    const products = new Products();

    let itemsProcessed = 0;

    this.imagesTable.forEach((item, index, array) => {
      let fd = new FormData();

      fd.append('file', item);

      itemsProcessed++;

      this.productsService.uploadFile(fd, this.currentUser.user.token).subscribe(
        (data) => {
          this.images.push(data.body.id);

          if (this.images.length === this.imagesTable.length) {
            products.name = this.createProductForm.get('name').value;
            products.slug = this.createProductForm.get('slug').value;
            products.description = this.createProductForm.get('description').value;
            products.price = this.createProductForm.get('price').value;
            products.date_added = '';
            products.is_active = true;
            products.quantity = this.createProductForm.get('quantity').value;
            products.category = this.categoryId;
            products.store = this.storeId;
            products.images = this.images;
            products.reviews = [];

            this.productsService.addProduct(products, this.currentUser.user.token).subscribe(
              (res) => {
                this.productId = res.body;

                const parcel = new Parcel();

                parcel.parcel_length = this.createProductForm.get('length').value;
                parcel.parcel_width = this.createProductForm.get('width').value;
                parcel.parcel_height = this.createProductForm.get('height').value;
                parcel.parcel_weight = this.createProductForm.get('weight').value;
                parcel.distance_unit = this.createProductForm.get('weight').value;
                parcel.mass_unit = this.createProductForm.get('weight').value;

                this.productsService.addParcel(this.productId.id, parcel, this.currentUser.user.token).subscribe(
                  (res) => {
                    console.table('Parcel sucess !');
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Product Created',
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  },
                  (err) => {
                    console.table('Parcel error !');
                  }
                );
                this.route.navigate(['/products']);
                this.getProducts();
              },
              (err) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: err.error.detail,
                });
              }
            );
          }
        },
        (error) => {
          console.log(error);
        }
      );
    });

    // products.id = Math.floor(Math.random() * 100);
  }
}
