/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { StoresViewService } from './stores-view.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stores-view',
  templateUrl: './stores-view.component.html',
  styleUrls: ['./stores-view.component.scss'],
})
export class StoresViewComponent implements OnInit {
  bestShop = [];
  title: string;
  titles = 'All shop';
  carouselId: string;
  showSpinner = true;
  shopOfTheWeek = [];
  constructor(private storesViewService: StoresViewService) {}

  async ngOnInit(): Promise<void> {
    const res: any = await this.storesViewService.getAllStores().toPromise();
    if (res.results) {
      this.showSpinner = false;
    }
    this.bestShop = res.results;
    this.shopOfTheWeek = res.results[0];
  }
}
