/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CategoriesService } from './../../services/categories/categories.service';
import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  @Input() home: string;
  @Input() categoryName: string;
  @Input() name: string;
  categoyId: string;
  constructor(private router: ActivatedRoute, private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.categoyId = this.router.snapshot.params.id;

    this.categoryService.getCategory(this.categoyId).subscribe((res) => {
      this.name = res.name;
    });
  }
}
