import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CalendarService } from './services/calendar.service';
import { IpcService } from './services/ipc.service';
import { SaveAndLoadService } from './services/save-and-load.service';
import { dayValues, quotaTopic, zeroValDay } from './components/week-table/week-table.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // TODO: Logo - application icon and header

  public showAdminSettings = false;
  public title = 'weeklyQuota';
  public quotas: quotaTopic[];

  constructor(private saveLoadService: SaveAndLoadService, private calService: CalendarService, private _ipc: IpcService) {
    this.quotas = [];
  }

  ngOnInit(): void {

    this.saveLoadService.loadFromExternal$.subscribe((q: quotaTopic[]) => {
      this.loadQuotas(q);
      }
    );

    this.saveLoadService.loadFromExternal();
  
    setTimeout(() => {
      this.loadQuotas([]);

      if (this.quotas?.length === 0) {
        this.quotas = this.saveLoadService.loadDataCookies();
      }
    }, 3000);

  }

  loadQuotas(newQ: quotaTopic[]){
    newQ.forEach(element => {
      this.quotas = [...this.quotas, element];
    });

    this.quotas = this.quotas.slice();
  }

  onSave() {
    this.saveLoadService.saveData(this.quotas);
  }

  onClear() {
    this.quotas.forEach(quota => {
      quota.daysValues = JSON.parse(JSON.stringify(Array(7).fill(zeroValDay)));
    });
  }

  onLoadFromImport(event: quotaTopic[]) {
    this.quotas = event;
  }
}
