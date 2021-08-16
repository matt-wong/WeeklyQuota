import { Pipe, PipeTransform } from '@angular/core';
import { quotaTopic } from './week-table/week-table.model';

@Pipe({
  name: 'quotaPlanPercent',
  pure: false
})
export class QuotaPlanPercentPipe implements PipeTransform {

  transform(quota: quotaTopic, ...args: unknown[]): number {
    let sum : number = 0;
    quota.daysValues.forEach(val => {
      sum = sum + val.planned + val.completed;
    });

    return sum / quota.quota * 100;
  }


}
