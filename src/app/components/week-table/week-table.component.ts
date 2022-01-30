import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuotaStatus, StatusFromItemPipe } from 'src/app/pipes/status-from-item.pipe';
import { QuotaPercentPipe } from '../../pipes/quota-percent.pipe';
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
    private statusPipe: StatusFromItemPipe,
    private calenderService: CalendarService,
    private weatherService: WeatherService
  ) {
    this.todayIndex = calenderService.getDayOfWeek();
  }

  ngOnInit(): void {
    this.dateNumbers[this.todayIndex] = this.calenderService.getDayOfMonth();
    for (let i = 0; i <= 6; i++) {
      this.dateNumbers[i] = this.calenderService.getDayOfMonth(i - this.todayIndex);
    }

    this.onCheckWeather();
  }

  onSelectionChange(quotaTopic: quotaTopic) {
    this.saveService.saveData(this.quotas);

    if (this.quotaPercentPipe.transform(quotaTopic) >= 100) {
      this.snackBarService.open('YAY! \n' + quotaTopic.name + ' has been completed for the week!', 'nice.', { duration: 4000 });
    }

    //TODO: Full week Complete! toast
  }

  onCheckWeather() {
    this.weatherService.getWeeksWeather().subscribe((dw: dayWeather[]) => {
      dw.forEach((wi: dayWeather) => {
        const dayOfWeekIndex = this.dateNumbers.findIndex((date) => { return date === wi.day });
        if (dayOfWeekIndex >= 0) {
          // console.log(dayOfWeekIndex);
          this.dayWeather[dayOfWeekIndex] = wi;
        }
      });
    })
  }

  public generateTooltipText(element: quotaTopic): string {
    const status = this.statusPipe.transform(element, this.todayIndex)
    let planSum = 0;
    element.daysValues.forEach(val => {
      planSum = planSum + val.planned;
    });

    if (planSum > 0) {
      return `${status}\u00A0\u00A0\u00A0\u00A0Planned: ${planSum}`
    } else {
      return `${status}`
    }
  }

  // Style Selector Functions
  public headerClassFromIndex(i: number): string {
    if (i === this.todayIndex) {
      return 'today-header';
    } else if (i === this.selectedDayIndex) {
      return 'selected-day-header'
    } else {
      return ''
    }
  }

  public progressBarClass(element: quotaTopic): string {
    const status = this.statusPipe.transform(element, this.todayIndex)
    switch (status) {
      case QuotaStatus.ahead:
        return 'good-progress';
      case QuotaStatus.behind:
        return 'bad-progress';
      case QuotaStatus.complete:
        return 'complete-progress';
      case QuotaStatus.danger:
        return 'very-bad-progress';
    }
  }

}
