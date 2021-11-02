import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-box-layouts',
  templateUrl: './box-layouts.component.html',
  styleUrls: ['./box-layouts.component.scss'],
})
export class BoxLayoutsComponent implements OnInit {
  @Input() items: number;
  @Input() itemsName: string;
  @Input() imgBg: string;
  @Input() img: string;
  constructor() {}

  ngOnInit(): void {}
}
