import { Component, Input, OnInit } from '@angular/core';
import { quotaTopic } from './week-table.model';

@Component({
  selector: 'app-week-table',
  templateUrl: './week-table.component.html',
  styleUrls: ['./week-table.component.scss']
})
export class WeekTableComponent implements OnInit {

  @Input() quotas: quotaTopic[] = [];

  defNames: string[] = ['day0', 'day1', 'day2', 'day3', 'day4', 'day5', 'day6'];
  dayDisplayNames: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  displayedColumns: string[] = ['name', 'status', 'statusBar', ...this.defNames, 'comment'];


  constructor() { }

  ngOnInit(): void {
  }

}
