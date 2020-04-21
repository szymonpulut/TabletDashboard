import React from 'react';
import axios from 'axios';

import { CovidData } from 'types/CovidData';

const updateIntervalInMs = 1 * 60 * 60 * 1000;
const covidApiUrl = 'https://corona-api.com/countries/pl';

const useCovidData = (): CovidData => {
    const [covidData, setCovidData] = React.useState<CovidData>({
        total: {
            confirmed: 0,
            deaths: 0,
            recovered: 0,
        },
        today: {
            confirmed: 0,
            deaths: 0,
        },
    });
    const [toggle, setToggle] = React.useState(false);

    const refreshCovid = (): void => {
        setToggle((toggle) => !toggle);
    };

    const setTimer = React.useEffect(() => {
        const timeIntervalId = setInterval(() => {
            refreshCovid();
        }, updateIntervalInMs);

        return (): void => {
            clearInterval(timeIntervalId);
        };
    }, []);

    const fetchData = React.useEffect(() => {
        axios.get(covidApiUrl).then((response) => {
            const { data } = response.data;

            setCovidData({
                total: {
                    confirmed: data.latest_data.confirmed,
                    deaths: data.latest_data.deaths,
                    recovered: data.latest_data.recovered,
                },
                today: {
                    confirmed: data.today.confirmed,
                    deaths: data.today.deaths,
                },
            });
        });
    }, [toggle]);

    return covidData;
};

export default useCovidData;
