export interface weatherResponse {
    init: string;
    dataseries: dayWeather[];
}

export interface dayWeather {
    date: number;
    day: number; //day of the month
    weather: string;
    wind10m_max: number;
    temp2m: minMaxTemp;
}

export interface minMaxTemp {
    min: number;
    max: number;
}
