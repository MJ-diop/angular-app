/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { CategoriesService } from './../../../services/categories/categories.service';
import { Category } from './../../../models/category/category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-categories',
  templateUrl: './top-categories.component.html',
  styleUrls: ['./top-categories.component.scss'],
})
export class TopCategoriesComponent implements OnInit {
  categories: Category[];
  category0: any;
  category1: any;
  category2: any;
  category3: any;
  category4: any;
  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(): void {
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data.results;
      this.category0 = this.categories[0];
      this.category1 = this.categories[1];
      this.category2 = this.categories[2];
      this.category3 = this.categories[3];
      this.category4 = this.categories[4];

      // this.categories.forEach((element) => {
      //   console.log(element);
      //   this.category0 = element.name;
      // });
    });
  }
}
