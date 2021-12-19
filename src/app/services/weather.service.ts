import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { dayWeather, weatherResponse } from './weather.service.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  private longtitude = -114.0719;
  private latitude = 51.0447;

  getWeeksWeather() : Observable<dayWeather[]> {
    return this.http.get<weatherResponse>('https://www.7timer.info/bin/civillight.php?lon=-114.0719&lat=51.0447&ac=0&unit=metric&output=json&tzshift=0').pipe(
      map((a: weatherResponse) => {
      console.log(a.init);
      a.dataseries.forEach(day => {
        day.day = day.date % 100; // example 20211219 is december 19
      });

      return a.dataseries;
    }))
  }

}
