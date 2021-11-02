/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category/category';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { ProductsService } from 'src/app/services/products/products.service';
uuidv4();

@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.scss'],
})
export class CreateCategoriesComponent implements OnInit {
  createCategoriesForm: FormGroup;
  categories: any;
  currentUser: any;
  categoryId: any;
  submited = false;
  fd = new FormData();
  image: any;

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private categoryService: CategoriesService,
    private authService: AuthenticationsService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.createCategoriesForm = this.fb.group({
      name: ['', Validators.required],
      slug: ['', Validators.required],
      description: ['', Validators.required],
      // is_active: ['', Validators.required],
      // created_by: ['', Validators.required],
      image: ['', Validators.required],
      parent: [''],
    });
    this.getCategory();
  }

  getCategory() {
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data.results;
    });
  }

  categoryEvent(event) {
    this.categoryId = event.target.value;
  }

  get f() {
    return this.createCategoriesForm.controls;
  }

  onSubmit() {
    this.submited = true;

    this.productsService.uploadFile(this.fd, this.currentUser.user.token).subscribe((data) => {
      this.image = data.body.file;
      const categories = new Category();
      if (!this.createCategoriesForm.get('parent').value) {
        categories.name = this.createCategoriesForm.get('name').value;
        categories.slug = this.createCategoriesForm.get('slug').value;
        categories.description = this.createCategoriesForm.get('description').value;
        categories.is_active = true;
        // categories.created_by = '';
        // categories.products = '';
        categories.image = this.image;
      }
      if (this.createCategoriesForm.get('parent').value) {
        categories.name = this.createCategoriesForm.get('name').value;
        categories.slug = this.createCategoriesForm.get('slug').value;
        categories.description = this.createCategoriesForm.get('description').value;
        categories.is_active = true;
        categories.image = this.image;

        this.categories.forEach((el, index) => {
          if (this.createCategoriesForm.get('parent').value === this.categories[index].name) {
            categories.parent = this.categories[index].id;
          }
        });
      }

      console.log(categories);

      this.categoryService.addCategory(categories, this.currentUser.user.token).subscribe(
        (res) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your category has been saved',
            showConfirmButton: false,
            timer: 1500,
          });
          this.route.navigate(['/categories']);
        },
        (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.error,
          });
        }
      );
    });
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

    this.fd.append('file', file);
  }
}
