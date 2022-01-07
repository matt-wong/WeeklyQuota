import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { quotaTopic, zeroValDay } from '../week-table/week-table.model';

@Component({
  selector: 'app-value-selector',
  templateUrl: './value-selector.component.html',
  styleUrls: ['./value-selector.component.scss']
})
export class ValueSelectorComponent implements OnInit {

  @Input() element: quotaTopic = {name:'dummy', icon: 'dummy', weekComment: '', daysValues: JSON.parse(JSON.stringify(Array(7).fill(zeroValDay))), quota: 1};
  @Input() i: number = 0;
  @Input() isSelected = false;

  @Output() changeEvent: EventEmitter<void> = new EventEmitter();

  isFuture: boolean = false;
  dayOfWeek: number = 0;
  valueOptions: number[] = [0, 0.5, 1, 1.5, 2];
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

    let newCompleteVal = this.element.daysValues[this.i].completed;
    let newPlannedVal = this.element.daysValues[this.i].planned;

    if (this.element.daysValues[this.i].planned >= 1) {
      newCompleteVal = this.element.daysValues[this.i].completed + 1;
      newPlannedVal = Math.max(0, this.element.daysValues[this.i].planned - 1);
    } else {
      newCompleteVal += this.element.daysValues[this.i].planned;
      newPlannedVal = 0;
    }

    this.addedCompleteValue = newCompleteVal;
    if (this.valueOptions.includes(this.addedCompleteValue)){
      // Don't bother showing the same option twice
      this.addedCompleteValue = 0;
    }

    setTimeout(() => {
      this.element.daysValues[this.i].completed = newCompleteVal;
      this.element.daysValues[this.i].planned = newPlannedVal;

      this.changeEvent.emit();
    })
  }

}
