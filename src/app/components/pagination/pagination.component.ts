import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories/categories.service';
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() products = [];
  totalLength: any;
  page = 1;
  categoyId: string;
  constructor(private router: ActivatedRoute, private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.categoyId = this.router.snapshot.params.id;

    this.categoryService.getCategory(this.categoyId).subscribe((res) => {
      this.products = res.products;
      this.totalLength = res.products.length;
      console.log(res.products.length);
    });
  }
}
