import { Pipe, PipeTransform } from '@angular/core';
import { quotaTopic } from '../week-table/week-table.model';
import { QuotaPercentPipe } from './quota-percent.pipe';

export enum QuotaStatus{
  complete = 0,
  ahead = 1,
  behind = 2,
  danger = 3
}

@Pipe({
  name: 'statusFromItem',
  pure: false
})
export class StatusFromItemPipe implements PipeTransform {

  private quotaPercentPipe = new QuotaPercentPipe(); 

  transform(quotaTopic: quotaTopic, ...args: number[]): QuotaStatus {
    
    let sum : number = 0;
    quotaTopic.daysValues.forEach(val => {
      sum = sum + val.completed;
    });

    const percentComplete = this.quotaPercentPipe.transform(quotaTopic)
    if (percentComplete >= 100){
      console.log('Complete')
      return QuotaStatus.complete;
    }else if(percentComplete > ((args[0] + 1)/7) * 100){
      // fraction of completed is greater than week gone by
      return QuotaStatus.ahead;
    }else if(quotaTopic.quota - sum > (7 - args[0] + 1) ){
      // at least 1 point per day needs to happen
      console.log('danger')
      return QuotaStatus.danger;
    }else{
      return QuotaStatus.behind;      
    }
  }

}
