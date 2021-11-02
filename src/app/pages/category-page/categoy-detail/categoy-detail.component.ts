/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-categoy-detail',
  templateUrl: './categoy-detail.component.html',
  styleUrls: ['./categoy-detail.component.scss'],
})
export class CategoyDetailComponent implements OnInit {
  products = [];
  categoyId: string;
  title;
  showSpinner = true;
  constructor(private router: ActivatedRoute, private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.categoyId = this.router.snapshot.params.id;
    this.getCategoryById();
  }

  async getCategoryById(): Promise<any> {
    const data = await this.categoryService.getCategory(this.categoyId).toPromise();

    if (data) {
      this.showSpinner = false;
      this.title = data.name;
      this.products = data.products;
    }
  }
}
