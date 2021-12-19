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
    return this.http.get<weatherResponse>('https://www.7timer.info/bin/astro.php?lon=-114.0719&lat=51.0447&ac=0&unit=metric&output=json&tzshift=0').pipe(
      map((a: weatherResponse) => {
      console.log(a.init);
      a.dataseries.forEach(momentData => {
        console.log(momentData.temp2m);
      });

      const dayWeather1 : dayWeather = {lowTemp: -5, highTemp: 34}

      return [dayWeather1];
    }))
  }

}
