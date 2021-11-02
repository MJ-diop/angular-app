import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  keyWord: any;
  @Input() isClicked: boolean = false;
  @Input() searchWord: string = '';
  @Output() login = new EventEmitter<string>();
  results: any[] = [];
  queryField: FormControl = new FormControl();
  constructor(private productsService: ProductsService, private router: Router) {}

  ngOnInit(): void {
    this.queryField.valueChanges.subscribe((queryField) => {
      this.keyWord = queryField;
      this.productsService.searchProducts(queryField).subscribe(
        (data) => {
          if (queryField !== '') {
            this.isClicked = true;
            this.results = data.results;
            this.isClicked = this.results.length === 1 ? false : true;
          } else {
            this.results = [];
            this.isClicked = false;
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
    this.searchWord = this.keyWord;
  }
  enterProduct(event) {
    this.login.emit(this.keyWord);
    this.searchWord = this.keyWord;
  }

  selectedProduct(result) {
    this.login.emit(result);
    this.searchWord = result;
    // this.keyWord = result;
    // this.results = [];
    // this.login.emit(this.keyWord);
    this.router.navigate([`product/${result}`]);
  }
}
