export interface TodayWeather {
    lowTemp: number;
    highTemp: number;
    weatherImage: string;
}

export interface ForecastWeather {
    [key: number]: {
        temp: number;
        weatherImage: string;
    };
    length: number;
}

export interface UseWeather {
    todayWeather: TodayWeather;
    forecastWeather: ForecastWeather;
    refreshWeather: () => void;
}
