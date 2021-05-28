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

  displayedColumns: string[] = ['name', 'status', ...this.defNames, 'comment'];


  constructor() { }

  ngOnInit(): void {
    this.quotas.push({name: 'Cooked Meals', daysValues: [1, 2, 0, 0, 0, 2, 1], icon: 'home', quota: 8,},
    {name: 'Vegetarian Meals', daysValues: [1, 1, 0, 0, 0, 0, 1], icon: 'fastfood', quota: 3, weekComment: 'VBurger'},
    {name: 'Hobby Session', daysValues: [0, 1, 0, 0, 0, 1, 1], icon: 'brush', quota: 5}
    )
  }

}
