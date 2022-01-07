import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuotaPercentPipe } from '../../pipes/quota-percent.pipe';
import { StatusFromItemPipe } from '../../pipes/status-from-item.pipe';
import { CalendarService } from '../../services/calendar.service';
import { SaveAndLoadService } from '../../services/save-and-load.service';
import { WeatherService } from '../../services/weather.service';
import { dayWeather } from '../../services/weather.service.model';
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
  dayWeather: Array<dayWeather | undefined> = [undefined, undefined, undefined, undefined, undefined, undefined, undefined];
  dateNumbers: number[] = new Array<number>(6);

  displayedColumns: string[] = ['name', 'status', 'statusBar', ...this.defNames, 'comment'];
  todayIndex = 0;
  selectedDayIndex = -1;

  constructor(
    private snackBarService: MatSnackBar,
    private saveService: SaveAndLoadService,
    private quotaPercentPipe: QuotaPercentPipe,
    private statusFromItemPipe: StatusFromItemPipe,
    private calenderService: CalendarService,
    private weatherService: WeatherService
    ) {this.todayIndex = calenderService.getDayOfWeek()}

  ngOnInit(): void {

    this.dateNumbers[this.todayIndex] = this.calenderService.getDayOfMonth();
    for (let i = 0; i <= 6; i++){
      this.dateNumbers[i] = this.calenderService.getDayOfMonth(i - this.todayIndex);
    }

    console.log(JSON.stringify(this.dateNumbers));

    this.onCheckWeather();
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

    this.quotas.forEach(element => {
      console.log(this.statusFromItemPipe.transform(element, 3))
    });

    //TODO: Full week Complete! toast
  }

  onCheckWeather(){
    console.log(this.dayWeather);
    console.log(this.dateNumbers);

    this.weatherService.getWeeksWeather().subscribe((dw : dayWeather[]) => {
      dw.forEach((wi: dayWeather) => {
        const dayOfWeekIndex = this.dateNumbers.findIndex((date)=>{return date === wi.day});
        if (dayOfWeekIndex >= 0){
          console.log(dayOfWeekIndex);
          this.dayWeather[dayOfWeekIndex] = wi;
        }
      });
    })
  }

}
