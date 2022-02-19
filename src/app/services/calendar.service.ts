import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  public dayChange$ = new Subject<number>();

  constructor() { }

  getDayOfWeek(): number{
    const now = new Date(Date.now());
    let dayOfWeek = now.getDay() - 1; // to make 0 monday;
    dayOfWeek = dayOfWeek === -1 ? 6 : dayOfWeek; // to make 6 sunday;
    return dayOfWeek; 
  }

  getWeekProgress(): number {
    return ((this.getDayOfWeek() + 1) / 7) * 100;
  }
  
  getDayOfMonth(offset? : number): number {
    let now = new Date(Date.now());
    if (offset){
      console.log(offset);
      var followingDay = new Date(now.getTime() + 86400000 * offset); // + 1 day in ms
      followingDay.toLocaleDateString();
      return followingDay.getDate();
    }

    return now.getDate();
  }

  refreshDay(): void {
    this.dayChange$.next(this.getDayOfWeek());
  }


}
