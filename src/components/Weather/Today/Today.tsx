import React from 'react';
import styled from 'styled-components';

import useAirQuality from 'hooks/useAirQuality';

import { TodayWeather } from 'types/Weather';

interface Props {
    weather: TodayWeather;
}

const getAirQualityColor = (
    airQualityValue: number,
    thresholds: { low: number; high: number },
): string => {
    if (airQualityValue <= thresholds.low) {
        return 'green';
    }
    if (airQualityValue <= thresholds.high) {
        return 'yellow';
    }
    return 'red';
};

const Today: React.FC<Props> = ({ weather }: Props) => {
    const { lowTemp, highTemp, weatherImage } = weather;
    const airQuality = useAirQuality();

    const airQuality25Color = getAirQualityColor(airQuality[25], {
        low: 25,
        high: 50,
    });
    const airQuality10Color = getAirQualityColor(airQuality[10], {
        low: 50,
        high: 100,
    });

    return (
        <TodayStyled>
            <Image src={weatherImage} />
            <Temps>
                <LowTemp>
                    <p>{lowTemp}&#176;C</p>
                    <p>LOW</p>
                </LowTemp>
                <HighTemp>
                    <p>{highTemp}&#176;C</p>
                    <p>HIGH</p>
                </HighTemp>
            </Temps>
            <AirQualityText>
                PM2.5:{' '}
                <span style={{ color: airQuality25Color }}>
                    {airQuality[25]} &#181;g/m&#xb3;
                </span>{' '}
                | PM10:{' '}
                <span style={{ color: airQuality10Color }}>
                    {airQuality[10]} &#181;g/m&#xb3;
                </span>
            </AirQualityText>
        </TodayStyled>
    );
};

const TodayStyled = styled.div`
    grid-area: weather-today;
    background-color: ${({ theme }): string => theme.colors.weatherTodayBg};

    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;

    padding: 20px;
    box-sizing: border-box;
`;

const Image = styled.img`
    width: 50%;
`;

const Temps = styled.div`
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    width: 100%;
    font-size: 2em;

    p {
        margin: 1.5vh 0;
    }
`;

const LowTemp = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
`;

const HighTemp = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
`;

const AirQualityText = styled.span`
    font-size: 0.7em;
`;

export default Today;
