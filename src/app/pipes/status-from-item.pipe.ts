import { Pipe, PipeTransform } from '@angular/core';
import { quotaTopic } from '../week-table/week-table.model';
import { QuotaPercentPipe } from './quota-percent.pipe';

export enum QuotaStatus{
  complete = "Complete!",
  ahead = "Ahead of Schedule",
  behind = 'Behind',
  danger = "Danger!"
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
      return QuotaStatus.complete;
    }else if(percentComplete > ((args[0] + 1)/7) * 100){
      // fraction of completed is greater than week gone by
      return QuotaStatus.ahead;
    }else if(quotaTopic.quota - sum > (7 - args[0] + 1) ){
      // at least 1 point per day needs to happen
      return QuotaStatus.danger;
    }else{
      return QuotaStatus.behind;      
    }
  }

}
