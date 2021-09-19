import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CalendarService } from '../services/calendar.service';
import { QuotaPercentPipe } from '../quota-percent.pipe';
import { SaveAndLoadService } from '../services/save-and-load.service';
import { quotaTopic } from './week-table.model';

@Component({
  selector: 'app-week-table',
  templateUrl: './week-table.component.html',
  styleUrls: ['./week-table.component.scss']
})
export class WeekTableComponent implements OnInit {

  // TODO: Select past dates (Planned -> Done.)

  // TODO: Adjustable Quotas

  // TODO: Editable Quota Topics

  @Input() quotas: quotaTopic[] = [];
  // @Output() valueChange: EventEmitter<boolean> = new EventEmitter;

  defNames: string[] = ['day0', 'day1', 'day2', 'day3', 'day4', 'day5', 'day6'];
  dayDisplayNames: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  displayedColumns: string[] = ['name', 'status', 'statusBar', ...this.defNames, 'comment'];
  todayIndex = 0;
  selectedDayIndex = -1;

  constructor(
    private snackBarService: MatSnackBar,
    private saveService: SaveAndLoadService,
    private quotaPercentPipe: QuotaPercentPipe,
    private calenderService: CalendarService
    ) {this.todayIndex = calenderService.getDayOfWeek()}

  ngOnInit(): void {
  }

  public headerClassFromIndex(i: number): string {
    if (i === this.todayIndex){
      return 'today-header';
    }else if (i === this.selectedDayIndex){
      return 'selected-day-header'
    }else{
      return ''
    }
  }

  onSelectionChange(quotaTopic: quotaTopic){
    console.log(this.selectedDayIndex);

    this.saveService.saveData(this.quotas); 

    if (this.quotaPercentPipe.transform(quotaTopic) >= 100){
      this.snackBarService.open('YAY! \n' + quotaTopic.name + ' has been completed for the week!', 'nice.', {duration: 4000});
    }

    //TODO: Full week Complete! toast
  }

}
