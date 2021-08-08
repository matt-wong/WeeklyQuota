import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuotaPercentPipe } from '../quota-percent.pipe';
import { SaveAndLoadService } from '../services/save-and-load.service';
import { quotaTopic } from '../week-table/week-table.model';

@Component({
  selector: 'app-value-selector',
  templateUrl: './value-selector.component.html',
  styleUrls: ['./value-selector.component.scss']
})
export class ValueSelectorComponent implements OnInit {

  @Input() element: quotaTopic = {name:'dummy', icon: 'dummy', weekComment: '', daysValues: [], quota: 1};
  @Input() i: number = 0;

  constructor(private snackBarService: MatSnackBar,
    private saveService: SaveAndLoadService,
    private quotaPercentPipe: QuotaPercentPipe) { }

  ngOnInit(): void {
  }

  onSelectionChange($event: any, quotaTopic?: quotaTopic){
    if (!quotaTopic) {
      return;
    }

    // this.saveService.saveData(this.quotas); 

    if (this.quotaPercentPipe.transform(quotaTopic) >= 100){
      this.snackBarService.open('YAY! \n' + quotaTopic.name + ' has been completed for the week!', 'nice.', {duration: 4000});
    }

    // TODO: Full week Complete! toast

  }

}
