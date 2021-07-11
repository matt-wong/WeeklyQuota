import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CalendarService } from './services/calendar.service';
import { IpcService } from './services/ipc.service';
import { SaveAndLoadService } from './services/save-and-load.service';
import { quotaTopic } from './week-table/week-table.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'weeklyQuota';
  quotas: quotaTopic[];

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
    }, 3000);
  }

  loadQuotas(newQ: quotaTopic[]){
    newQ.forEach(element => {
      console.log(element)
      this.quotas = [...this.quotas, element];
      console.log(this.quotas)
    });

    this.quotas = this.quotas.slice();
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
