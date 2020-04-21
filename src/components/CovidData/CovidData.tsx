import React from 'react';
import styled from 'styled-components';

import useCovidData from 'hooks/useCovidData';

const CovidData: React.FC = () => {
    const { today, total } = useCovidData();

    return (
        <CovidDataStyled>
            <p>
                Confirmed: {today.confirmed} today, {total.confirmed} total
            </p>
            <p>
                Deaths: {today.deaths} today, {total.deaths} total
            </p>
            <p>Recovered: {total.recovered} total</p>
        </CovidDataStyled>
    );
};

const CovidDataStyled = styled.div`
    grid-area: covid-data;
    background-color: ${({ theme }): string => theme.colors.covidDataBg};

    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;

    p {
        margin: 5px;
        font-size: 1.1em;
    }
`;

export default CovidData;
