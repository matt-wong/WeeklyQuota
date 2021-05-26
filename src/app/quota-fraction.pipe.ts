import { Pipe, PipeTransform } from '@angular/core';
import { quotaTopic } from './week-table/week-table.model';

@Pipe({
  name: 'quotaFraction',
  pure: false
})
export class QuotaFractionPipe implements PipeTransform {

  transform(quota: quotaTopic, ...args: unknown[]): unknown {
    let sum : number = 0;
    quota.daysValues.forEach(val => {
      sum = sum + val;
    });

    return sum + ' / ' + quota.quota;
  }

}
