import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor() { }

  getDayOfWeek(): number{
    const now = new Date(Date.now());
    return now.getDay() - 1; // to make 0 monday;
  }

  getWeekProgress(): number {
    return ((this.getDayOfWeek() + 1) / 7) * 100;
  }

}
