import { Component, Input, OnInit } from '@angular/core';
import { dayWeather } from '../services/weather.service.model';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.scss']
})
export class WeatherDisplayComponent implements OnInit {

  @Input() dayWeather?: dayWeather;
  
  constructor() { }

  ngOnInit(): void {
  }

}
