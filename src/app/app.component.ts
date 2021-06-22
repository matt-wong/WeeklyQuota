import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CalendarService } from './services/calendar.service';
import { IpcService } from './services/ipc.service';
import { SaveAndLoadService } from './services/save-and-load.service';
import { quotaTopic } from './week-table/week-table.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'weeklyQuota';
  quotas: quotaTopic[] = [];

  constructor(private saveLoadService: SaveAndLoadService, private calService: CalendarService, private _ipc: IpcService) {
    this.quotas = this.saveLoadService.loadData();

    this._ipc.on('log');

    this._ipc.send('ping', '');

  }

  onSave() { //TODO: auto save on changes
    this.saveLoadService.saveData(this.quotas);
    console.log(this.calService.getDayOfWeek());
    console.log(this.calService.getWeekProgress());
  }

  onClear() {
    this.quotas.forEach(quota => {
      quota.daysValues = [0,0,0,0,0,0,0];
    });
  }
}
