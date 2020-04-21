import React from 'react';
import styled from 'styled-components';

import { ForecastWeather } from 'types/Weather';

import SingleDay from './SingleDay/SingleDay';

interface Props {
    weather: ForecastWeather;
}

const Forecast: React.FC<Props> = ({ weather }: Props) => {
    const days = [];

    for (let i = 1; i <= weather.length; i++) {
        days.push(
            <SingleDay
                temp={weather[i].temp}
                image={weather[i].weatherImage}
                key={i}
            />,
        );
    }
    return <ForecastStyled>{days}</ForecastStyled>;
};

const ForecastStyled = styled.div`
    grid-area: weather-forecast;
    background-color: ${({ theme }): string => theme.colors.weatherForecastBg};

    display: flex;
    flex-flow: row;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 12px;
    box-sizing: border-box;
`;

export default Forecast;
