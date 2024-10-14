import { Component, OnInit } from '@angular/core';
import { SaveAndLoadService } from './services/save-and-load.service';
import { quotaTopic, zeroValDay } from './components/week-table/week-table.model';
import {Clipboard} from '@angular/cdk/clipboard';

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
  
  public showCompletionPage = false
  public completedPercent = 0; // 0-100
  public plannedPercent = 0; // 0-100
  public fractionString = "" // X / Y (Z)

  constructor(private saveLoadService: SaveAndLoadService, private clipboard: Clipboard) {
    this.quotas = [];
  }

  ngOnInit(): void {

    this.saveLoadService.loadFromExternal$.subscribe((q: quotaTopic[]) => {
      this.loadQuotas(q);
      this.refreshQuotaPercentage();
      }
    );

      this.saveLoadService.dataSaved$.subscribe((q: quotaTopic[]) => {
        console.log('yaya')
        this.quotas = q;
        this.refreshQuotaPercentage();
      })

    this.saveLoadService.loadFromExternal();
  
    setTimeout(() => {
      this.loadQuotas([]);

      if (this.quotas?.length === 0) {
        this.quotas = this.saveLoadService.loadDataCookies();
        this.refreshQuotaPercentage();
      }
    }, 3000);
  }

  loadQuotas(newQ: quotaTopic[]){
    newQ.forEach(element => {
      this.quotas = [...this.quotas, element];
    });

    this.quotas = this.quotas.slice();
    this.refreshQuotaPercentage();
  }

  onSave() {
    this.saveLoadService.saveData(this.quotas);
    this.refreshQuotaPercentage();
  }

  onClear() {
    this.quotas.forEach(quota => {
      quota.daysValues = JSON.parse(JSON.stringify(Array(7).fill(zeroValDay)));
    });
  }

  onLoadFromImport(event: quotaTopic[]) {
    this.quotas = event;
    this.refreshQuotaPercentage();
  }

  private refreshQuotaPercentage()
  {
    let total = 0
    let sumPlanned = 0;
    let sumDone = 0;

    if (this.quotas?.length > 0)
    {
      this.quotas.forEach((q) => {

        total += q.quota;
  
        q.daysValues.forEach(dayVal => {
          sumPlanned += dayVal.planned;
          sumDone += dayVal.completed;
        });
      });

      this.completedPercent = sumDone / total * 100;
      this.plannedPercent = (sumPlanned + sumDone) / total * 100;
      this.fractionString = `${sumDone} / ${total} (${sumPlanned})`

    }


  }

  closeCompletionPage(){
    this.showCompletionPage = false;
  }

  onComplete(){
    this.showCompletionPage = true;
  }
}
