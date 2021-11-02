import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category/category';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: Category;
  currentUser: any;
  // disabledBtn = false;
  // userToken: string;

  constructor(private categoryService: CategoriesService, private authService: AuthenticationsService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.getCategory();
    // this.userToken = this.currentUser.user.token;

    // if (!this.userToken) {
    //   this.disabledBtn = true;
    // }
  }

  getCategory() {
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data.results.filter((category) => {
        return category.parent === null;
      });
    });
  }

  deleteCategory(id) {
    this.categoryService.deleteCategory(id, this.currentUser.user.token).subscribe(
      (res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'The category has been deleted !',
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload();
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong !',
        });
      }
    );
  }
}
