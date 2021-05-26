import { Component, Input, OnInit } from '@angular/core';
import { quota } from './week-table.model';

@Component({
  selector: 'app-week-table',
  templateUrl: './week-table.component.html',
  styleUrls: ['./week-table.component.scss']
})
export class WeekTableComponent implements OnInit {

  @Input() quotas: quota[] = [];

  displayedColumns: string[] = ['name', 'status'];
  constructor() { }

  ngOnInit(): void {
    this.quotas.push({name: 'Cooked Meals', daysValues: [1, 2, 0, 0, 0, 2, 1], icon: 'home', quota: 8},
    {name: 'Vegetarian Meals', daysValues: [1, 2, 0, 0, 0, 2, 1], icon: 'fastfood', quota: 3},
    {name: 'Hobby Session', daysValues: [1, 1, 0, 0, 0, 1, 1], icon: 'brush', quota: 5}
    )
  }

}
