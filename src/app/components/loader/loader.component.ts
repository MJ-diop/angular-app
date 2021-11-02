import { LoaderService } from './../../services/loader/loader.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit {
  loading$ = this.loader.loading$;

  constructor(public loader: LoaderService) {}

  ngOnInit(): void {}
}
