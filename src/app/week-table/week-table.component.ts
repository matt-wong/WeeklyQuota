import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuotaPercentPipe } from '../quota-percent.pipe';
import { SaveAndLoadService } from '../services/save-and-load.service';
import { quotaTopic } from './week-table.model';

@Component({
  selector: 'app-week-table',
  templateUrl: './week-table.component.html',
  styleUrls: ['./week-table.component.scss']
})
export class WeekTableComponent implements OnInit {

  @Input() quotas: quotaTopic[] = [];
  // @Output() valueChange: EventEmitter<boolean> = new EventEmitter;

  defNames: string[] = ['day0', 'day1', 'day2', 'day3', 'day4', 'day5', 'day6'];
  dayDisplayNames: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  displayedColumns: string[] = ['name', 'status', 'statusBar', ...this.defNames, 'comment'];


  constructor(private snackBarService: MatSnackBar, private saveService: SaveAndLoadService, private quotaPercentPipe: QuotaPercentPipe) { }

  ngOnInit(): void {
  }

  onSelectionChange($event: any, quotaTopic: quotaTopic){
    this.saveService.saveData(this.quotas); 

    if (this.quotaPercentPipe.transform(quotaTopic) >= 100){
      this.snackBarService.open('YAY! \n' + quotaTopic.name + ' has been completed for the week!', 'nice.', {duration: 4000});
    }

  }

}
