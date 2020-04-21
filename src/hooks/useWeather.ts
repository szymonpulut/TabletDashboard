import React from 'react';
import axios from 'axios';

import { ThemeContext } from 'styled-components';

import { TodayWeather, ForecastWeather, UseWeather } from 'types/Weather';
import loadWeatherIcons from 'utils/loadWeatherIcons';

import secrets from 'utils/secrets.json';

const weatherApiUrl = `http://api.openweathermap.org/data/2.5/forecast/daily?id=${secrets.weatherApi.cityId}&appid=${secrets.weatherApi.key}&units=metric&cnt=7`;
const updateIntervalInMs = 60 * 60 * 1000;

const weatherCodeToImage = (code: number, weatherIcons: any): string => {
    if (code === 800) return weatherIcons.sun;
    if (code > 800 && code < 900 && code !== 803 && code !== 804)
        return weatherIcons.partlyCloudy;
    if (code >= 600 && code <= 699) return weatherIcons.snow;
    if (code === 803 || code === 804) return weatherIcons.cloudy;
    if (code >= 200 && code <= 299) return weatherIcons.thunderstorm;
    if (code >= 300 && code <= 399) return weatherIcons.rain;
    if (code >= 500 && code <= 599) return weatherIcons.rain;
    return '';
};

const useWeather = (): UseWeather => {
    const currentTheme = React.useContext(ThemeContext);
    const [weatherIcons, setWeatherIcons] = React.useState(
        loadWeatherIcons(currentTheme),
    );

    const updateWeatherIconsToTheme = React.useEffect(() => {
        setWeatherIcons(loadWeatherIcons(currentTheme));
    }, [currentTheme]);

    const [todayWeather, setTodayWeather] = React.useState<TodayWeather>({
        lowTemp: 0,
        highTemp: 0,
        weatherImage: '',
    });

    const [forecastWeather, setForecastWeather] = React.useState<
        ForecastWeather
    >({ 1: { temp: 0, weatherImage: '' }, length: 1 });
    const [toggle, setToggle] = React.useState(false);

    const refreshWeather = (): void => {
        setToggle((toggle) => !toggle);
    };
    const setTimer = React.useEffect(() => {
        const timeIntervalId = setInterval(() => {
            refreshWeather();
        }, updateIntervalInMs);

        return (): void => {
            clearInterval(timeIntervalId);
        };
    }, []);

    const fetchWeather = React.useEffect(() => {
        axios.get(weatherApiUrl).then((response) => {
            const tempTodayWeather: Partial<TodayWeather> = {};
            const tempForecastWeather: Partial<ForecastWeather> = {};

            tempTodayWeather.lowTemp = Math.round(
                response.data.list[0].temp.min,
            );
            tempTodayWeather.highTemp = Math.round(
                response.data.list[0].temp.max,
            );
            tempTodayWeather.weatherImage = weatherCodeToImage(
                response.data.list[0].weather[0].id,
                weatherIcons,
            );

            for (let i = 1; i < 7; i++) {
                const currentTemp = Math.round(response.data.list[i].temp.max);
                const currentWeatherImage = weatherCodeToImage(
                    response.data.list[i].weather[0].id,
                    weatherIcons,
                );

                tempForecastWeather[i] = {
                    temp: currentTemp,
                    weatherImage: currentWeatherImage,
                };

                tempForecastWeather.length = i;
            }

            setTodayWeather(tempTodayWeather as TodayWeather);
            setForecastWeather(tempForecastWeather as ForecastWeather);
        });
    }, [toggle, weatherIcons]);

    return { todayWeather, forecastWeather, refreshWeather };
};

export default useWeather;
