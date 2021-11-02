import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  keyWord: any;
  @Output() login = new EventEmitter<string>();
  results: any[] = [];
  checkedProduct = false;
  queryField: FormControl = new FormControl();
  constructor(private productsService: ProductsService, private router: Router) {}

  ngOnInit(): void {
    this.queryField.valueChanges.subscribe((queryField) => {
      this.keyWord = queryField;
      this.productsService.searchProducts(queryField).subscribe(
        (data) => {
          if (queryField !== '') {
            this.results = data.results;
          } else {
            this.results = [];
          }
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  submit() {
    this.login.emit(this.keyWord);
  }

  enterProduct(event) {
    this.login.emit(this.keyWord);
  }

  selectedProduct(result) {
    this.keyWord = result;
    this.login.emit(this.keyWord);
    this.router.navigate([`product/${result}`]);
  }
}
