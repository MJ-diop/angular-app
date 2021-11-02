import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/models/products/products';
import { Store } from 'src/app/models/store/store';
import { StoresService } from 'src/app/services/stores/stores.service';

@Component({
  selector: 'app-single-region',
  templateUrl: './single-region.component.html',
  styleUrls: ['./single-region.component.css'],
})
export class SingleRegionComponent implements OnInit {
  stores: Store[];
  products: Products[];
  storesNumber;
  productsNumber;
  region;
  showSpinner = true;

  constructor(private storeService: StoresService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.region = this.route.snapshot.params['region'];

    console.log(this.region);
    this.getStoresByRegion(this.region);
  }

  getStoresByRegion(region: string) {
    this.storeService.getStoresByRegion(region).subscribe(
      (data) => {
        console.log(data.results);
        this.stores = data.results;
        this.storesNumber = data.count;
        // for (let store in this.stores){
        //   this.products.push(store)
        // }
        // this.productsNumber = this.products.length
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
