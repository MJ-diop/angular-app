import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPrice',
})
export class FilterPricePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!value) return null;
    if (!args) return value;

    return value.filter(function (item) {
      return Number(args) >= Number(item.price);
    });
  }
}
