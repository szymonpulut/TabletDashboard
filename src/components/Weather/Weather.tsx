import React from 'react';
import styled from 'styled-components';

import useWeather from 'hooks/useWeather';

import Today from './Today/Today';
import Forecast from './Forecast/Forecast';

const Weather: React.FC = () => {
    const { todayWeather, forecastWeather } = useWeather();
    return (
        <WeatherStyled>
            <Today weather={todayWeather} />
            <Forecast weather={forecastWeather} />
        </WeatherStyled>
    );
};

const WeatherStyled = styled.div`
    grid-area: weather;

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: 'weather-today weather-forecast';
`;

export default Weather;
