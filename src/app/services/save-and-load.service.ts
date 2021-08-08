import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { dayValues, quotaTopic, zeroValDay } from '.././week-table/week-table.model';
import { IpcService } from './ipc.service';
import { map, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaveAndLoadService {

  loadFromExternal$ = new Subject<quotaTopic[]>();

  loadFromExternal() {
    
    // this.loadFromExternal$.next([{ name: 'test', daysValues: [1, 1, 0, 0, 0, 0, 1], icon: 'spa', quota: 3 }]);

    this.ipcService.loadEvent.subscribe((topics) => {
      this.loadFromExternal$.next(<quotaTopic[]>topics);});

    this.ipcService.send('load', {});
  }

  constructor(private cookieService: CookieService, private ipcService: IpcService) {
  }

  loadDataCookies(): quotaTopic[] {
    if (this.cookieService.get('data')) {
      try {
        return JSON.parse(this.cookieService.get('data'));
      } catch (e) {
       return this.loadDefaultQuotas();
      }

    } else {
      return this.loadDefaultQuotas();
    }

  }

  zeroVal(): dayValues{
    return {completed: 0, planned: 0};
  }

  zeroValWeek(): dayValues[] {
    return [this.zeroVal(),this.zeroVal(),this.zeroVal(),this.zeroVal(),this.zeroVal(),this.zeroVal(),this.zeroVal()];
  }
  
  loadDefaultQuotas() : quotaTopic[] {
    const quotas : quotaTopic[] = [];

    quotas.push({ name: 'Cooked Meals', daysValues: this.zeroValWeek(), icon: 'no_food', quota: 8, },
      { name: 'Vegetarian Meals', daysValues: this.zeroValWeek(), icon: 'spa', quota: 3 },
      { name: 'Exercise', daysValues: this.zeroValWeek(), icon: 'fitness_center', quota: 4 },
      { name: 'Social', daysValues: this.zeroValWeek(), icon: 'people', quota: 4 },
      { name: 'Help', daysValues: this.zeroValWeek(), icon: 'support', quota: 1 },
      { name: 'Self-Development', daysValues: this.zeroValWeek(), icon: 'handyman', quota: 1.5 },
      { name: 'New Thing', daysValues: this.zeroValWeek(), icon: 'new_releases', quota: 1.5 },
      { name: 'House Maintainance', daysValues: this.zeroValWeek(), icon: 'home', quota: 3 },
      { name: 'Hobby Session', daysValues: this.zeroValWeek(), icon: 'brush', quota: 5 },
      { name: 'Meditate', daysValues: this.zeroValWeek(), icon: 'airline_seat_recline_extra', quota: 4 }
    )
    return quotas;
  }

  
  saveData(quotaData : quotaTopic[]) {
    var date = new Date();

    // add a long expiry - year
    date.setDate(date.getDate() + 365);
    this.cookieService.set('data', JSON.stringify(quotaData), date);

    this.ipcService.send('save', JSON.stringify(quotaData));
    console.log(quotaData);
  }

}
