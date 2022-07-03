import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { quotaTopic } from '../components/week-table/week-table.model';

@Component({
  selector: 'app-quota-header',
  templateUrl: './quota-header.component.html',
  styleUrls: ['./quota-header.component.scss']
})
export class QuotaHeaderComponent implements OnInit {

  @Input() quotaTopic?: quotaTopic;

  constructor() { }

  ngOnInit(): void {
  }

}
