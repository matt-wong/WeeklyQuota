import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

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

}
