import React from 'react';
import axios from 'axios';

import { AirQuality } from 'types/AirQuality';

import secrets from 'utils/secrets.json';

const airQualityApiUrl = `https://airapi.airly.eu/v2/measurements/point?${secrets.airQualityApi.locationQueryUrl}`;
const updateIntervalInMs = 60 * 60 * 1000;

const useAirQuality = (): AirQuality => {
    const [airQuality, setAirQuality] = React.useState<AirQuality>({
        25: 0,
        10: 0,
    });
    const [toggle, setToggle] = React.useState(false);

    const refreshAirQuality = (): void => {
        setToggle((toggle) => !toggle);
    };

    const setTimer = React.useEffect(() => {
        const timeIntervalId = setInterval(() => {
            refreshAirQuality();
        }, updateIntervalInMs);

        return (): void => {
            clearInterval(timeIntervalId);
        };
    }, []);

    const fetchData = React.useEffect(() => {
        axios
            .get(airQualityApiUrl, {
                headers: { apikey: secrets.airQualityApi.key },
            })
            .then((response) => {
                setAirQuality({
                    25: Math.round(response.data.current.values[1].value),
                    10: Math.round(response.data.current.values[2].value),
                });
            });
    }, [toggle]);

    return airQuality;
};

export default useAirQuality;
