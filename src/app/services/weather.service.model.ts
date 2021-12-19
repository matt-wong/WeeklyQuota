export interface weatherResponse {
    init: string,
    dataseries: momentReponseData[]
}

export interface momentReponseData {
    timepoint: number;
    cloudcover: number;
    lifted_index: number;
    prec_type: string;
    prec_amount: number;
    temp2m: number;
    rh2m: string;
    weather: string;
}

export interface dayWeather {
   highTemp: number;
   lowTemp: number;
}