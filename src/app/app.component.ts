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
  myData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])

  constructor(private saveLoadService: SaveAndLoadService, private calService: CalendarService, private _ipc: IpcService) {
    this.quotas = [{ name: 'Vegetarian Meals', daysValues: [1, 1, 0, 0, 0, 0, 1], icon: 'spa', quota: 3 }];
  }

  ngOnInit(): void {
    this.saveLoadService.loadFromExternal();

    this.saveLoadService.loadFromExternal$.subscribe((q: quotaTopic[]) => {
            
      // // this.myData.next();


      q.forEach(element => {
        console.log(element)
        this.quotas = [...this.quotas, element];
      });

      console.log(this.quotas);
      console.table(this.quotas);
      
      this.quotas = this.quotas.slice();

    }
    
    );
    const q = [{ name: 'Begetarian Meals', daysValues: [1, 1, 0, 0, 0, 0, 1], icon: 'spa', quota: 3 }, { name: 'Aegetarian Meals', daysValues: [1, 1, 0, 0, 0, 0, 1], icon: 'spa', quota: 3 }];
    q.forEach(element => {
      console.log(element)
      this.quotas = [...this.quotas, element];
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
