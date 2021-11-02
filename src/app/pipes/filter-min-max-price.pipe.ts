import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMinMaxPrice',
})
export class FilterMinMaxPricePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!value) return null;
    if (args.length === 0) return value;
    if (!args[0] && !args[1]) return value;

    return value.filter(function (item) {
      return Number(args[1]) >= Number(item.price) && Number(item.price) > Number(args[0]);
    });
  }
}
