import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { quotaTopic } from './week-table/week-table.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'weeklyQuota';
  quotas: quotaTopic[] = [];

  constructor(private cookieService: CookieService) {

    if (cookieService.get('data')) {
      try {
        this.quotas = JSON.parse(cookieService.get('data'));
      } catch (e) {
        this.loadDefaultQuotas();
      }

    } else {
      this.loadDefaultQuotas();
    }
  }

  loadDefaultQuotas() {
    this.quotas.push({ name: 'Cooked Meals', daysValues: [1, 2, 0, 0, 0, 2, 1], icon: 'no_food', quota: 8, },
      { name: 'Vegetarian Meals', daysValues: [1, 1, 0, 0, 0, 0, 1], icon: 'spa', quota: 3 },
      { name: 'Exercise', daysValues: [0, 0, 0, 0, 0, 0, 0], icon: 'fitness_center', quota: 4 },
      { name: 'Social', daysValues: [0, 0, 0, 0, 0, 0, 0], icon: 'people', quota: 4 },
      { name: 'Help', daysValues: [0, 0, 0, 0, 0, 0, 0], icon: 'support', quota: 1 },
      { name: 'Self-Development', daysValues: [0, 0, 0, 0, 0, 0, 0], icon: 'handyman', quota: 1.5 },
      { name: 'New Thing', daysValues: [0, 0, 0, 0, 0, 0, 0], icon: 'new_releases', quota: 1.5 },
      { name: 'House Maintainance', daysValues: [0, 0, 0, 0, 0, 0, 0], icon: 'home', quota: 3 },
      { name: 'Hobby Session', daysValues: [0, 1, 0, 0, 0, 1, 1], icon: 'brush', quota: 5 },
      { name: 'Meditate', daysValues: [0, 1, 0, 0, 0, 1, 1], icon: 'airline_seat_recline_extra', quota: 4 }
    )
  }

  onSave() {
    var date = new Date();

    // add a long expiry - year
    date.setDate(date.getDate() + 365);
    this.cookieService.set('data', JSON.stringify(this.quotas), date);
  }
}
