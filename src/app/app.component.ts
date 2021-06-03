import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SaveAndLoadService } from './save-and-load.service';
import { quotaTopic } from './week-table/week-table.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'weeklyQuota';
  quotas: quotaTopic[] = [];

  constructor(private saveLoadService: SaveAndLoadService) {
    this.quotas = this.saveLoadService.loadData();
  }

  onSave() { //TODO: auto save on changes
    this.saveLoadService.saveData(this.quotas);
  }

  onClear() {
    this.quotas.forEach(quota => {
      quota.daysValues = [0,0,0,0,0,0,0];
    });
  }
}
