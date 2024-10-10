import { Component, OnInit } from '@angular/core';
import { SaveAndLoadService } from './services/save-and-load.service';
import { quotaTopic, zeroValDay } from './components/week-table/week-table.model';
import {Clipboard} from '@angular/cdk/clipboard';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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

  constructor(private saveLoadService: SaveAndLoadService, private clipboard: Clipboard, private http: HttpClient) {
    this.quotas = [];
  }

  async ngOnInit() {

    try {
      // Call the getData method from the service
      const data = await this.saveLoadService.getQuotasFromApi();
      console.log('Data received:', data);
      this.loadQuotas(data);
    } catch (error) {
      // Handle the error as needed
      console.error('Error in component:', error);
      this.loadQuotas(this.saveLoadService.loadDataCookies());
    }
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

    }


  }

  closeCompletionPage(){
    this.showCompletionPage = false;
  }

  onComplete(){
    this.showCompletionPage = true;
  }
}
