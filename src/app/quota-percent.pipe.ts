import { Pipe, PipeTransform } from '@angular/core';
import { quotaTopic } from './week-table/week-table.model';

@Pipe({
  name: 'quotaPercent',
  pure: false
})
export class QuotaPercentPipe implements PipeTransform {

  transform(quota: quotaTopic, ...args: unknown[]): number {
    let sum : number = 0;
    quota.daysValues.forEach(val => {
      sum = sum + val.completed;
    });

    return sum / quota.quota * 100;
  }

}
