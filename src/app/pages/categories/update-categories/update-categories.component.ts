import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category/category';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { window } from 'rxjs/operators';
uuidv4();

@Component({
  selector: 'app-update-categories',
  templateUrl: './update-categories.component.html',
  styleUrls: ['./update-categories.component.scss'],
})
export class UpdateCategoriesComponent implements OnInit {
  createCategoriesForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    slug: new FormControl(''),
    is_active: new FormControl(''),
  });
  categorys: Category;
  currentUser: any;
  constructor(
    private route: Router,
    private fb: FormBuilder,
    private categoryService: CategoriesService,
    private authService: AuthenticationsService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategory(this.router.snapshot.params.id).subscribe((res) => {
      this.createCategoriesForm.patchValue({
        name: res.name,
        slug: res.slug,
        description: res.description,
        is_active: res.is_active,
      });
    });
    this.currentUser = this.authService.currentUserValue;
  }

  onSubmit() {
    const category = {
      id: this.router.snapshot.params.id,
      name: this.createCategoriesForm.get('name').value,
      description: this.createCategoriesForm.get('description').value,
      is_active: this.createCategoriesForm.get('is_active').value,
    };

    this.categoryService
      .updateCategory(this.router.snapshot.params.id, category, this.currentUser.user.token)
      .subscribe(
        (res) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Category modified',
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
  }
}
