import { Pipe, PipeTransform } from '@angular/core';
import { quotaTopic } from '../components/week-table/week-table.model';

@Pipe({
  name: 'unfinishedPlan'
})
export class UnfinishedPlanPipe implements PipeTransform {

  transform(topics: quotaTopic[], dayIndex: number): unknown {
    if (topics.some((qt) => qt.daysValues[dayIndex].planned > 0)){
      return true;
    } else {
      return false;
    }
  }

}
