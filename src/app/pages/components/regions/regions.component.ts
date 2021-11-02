import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoresService } from 'src/app/services/stores/stores.service';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss'],
})
export class RegionsComponent implements OnInit {
  constructor(private storeService: StoresService, private router: Router) {}

  ngOnInit(): void {}

  getStoreRegion(region: string) {
    this.router.navigate(['/single-region', { region: region }]);
  }
}
