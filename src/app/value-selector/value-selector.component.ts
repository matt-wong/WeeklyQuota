import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuotaPercentPipe } from '../quota-percent.pipe';
import { CalendarService } from '../services/calendar.service';
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

  @Output() changeEvent: EventEmitter<void> = new EventEmitter();

  isFuture: boolean = false;

  constructor(private calendarService: CalendarService) {
  }

  ngOnInit(): void {
    this.isFuture = this.i > this.calendarService.getDayOfWeek(); 
  }

  onSelectionChange($event: any, quotaTopic?: quotaTopic){
    if (!quotaTopic) {
      return;
    }

    this.changeEvent.emit($event);
  }

}
