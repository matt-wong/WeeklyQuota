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

// clearday, clearnight
// pcloudyday, pcloudynight
// mcloudyday, mcloudynight
// cloudyday, cloudynight
// humidday, humidnight
// lightrainday, lightrainnight
// oshowerday, oshowernight
// ishowerday, ishowernight
// lightsnowday, lightsnownight
// rainday, rainnight	
// snowday, snownight	
// rainsnowday, rainsnownight

export interface minMaxTemp {
    min: number;
    max: number;
}
