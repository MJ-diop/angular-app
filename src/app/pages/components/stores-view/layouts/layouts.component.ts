import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss'],
})
export class LayoutsComponent implements OnInit {
  @Input() title: string;
  @Input() carouselId: string;
  @Input() stores = [];
  constructor() {}

  ngOnInit(): void {}
}
