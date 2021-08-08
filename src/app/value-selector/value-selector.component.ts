import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../services/calendar.service';
import { quotaTopic } from '../week-table/week-table.model';

@Component({
  selector: 'app-value-selector',
  templateUrl: './value-selector.component.html',
  styleUrls: ['./value-selector.component.scss']
})
export class ValueSelectorComponent implements OnInit {

  @Input() element: quotaTopic = {name:'dummy', icon: 'dummy', weekComment: '', daysValues: [], quota: 1};
  @Input() i: number = 0;

  @Output() changeEvent: EventEmitter<void> = new EventEmitter();

  isFuture: boolean = false;
  dayOfWeek: number = 0;
  valueOptions: number[] = [0, 0.5, 1, 2];
  addedCompleteValue: number = 0;

  constructor(private calendarService: CalendarService) {
    this.dayOfWeek = this.calendarService.getDayOfWeek()
  }

  ngOnInit(): void {
    this.isFuture = this.i > this.dayOfWeek;
  }

  onSelectionChange($event: any, quotaTopic?: quotaTopic){
    if (!quotaTopic) {
      return;
    }

    this.changeEvent.emit($event);
  }

  onPlanCompletion(){
    this.addedCompleteValue = this.element.daysValues[this.i].completed + this.element.daysValues[this.i].planned;
    if (this.valueOptions.includes(this.addedCompleteValue)){
      // Don't bother showing the same option twice
      this.addedCompleteValue = 0;
    }

    setTimeout(() => {
      this.element.daysValues[this.i].completed += this.element.daysValues[this.i].planned;
      this.element.daysValues[this.i].planned = 0;
    })
  }

}
