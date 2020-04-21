import React from 'react';
import styled from 'styled-components';

import useTime from 'hooks/useTime';
import useTheme from 'hooks/useTheme';

const Clock: React.FC = () => {
    const { time, date } = useTime();
    const { toggleTheme } = useTheme();

    return (
        <ClockStyled onClick={toggleTheme}>
            <H1>{time}</H1>
            <H2>{date}</H2>
        </ClockStyled>
    );
};

const ClockStyled = styled.div`
    grid-area: clock;
    background-color: ${({ theme }): string => theme.colors.clockBg};

    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
`;

const H1 = styled.h1`
    font-size: 7.25em;
    line-height: 1;
    font-weight: 300;
    margin: 10px 0;
`;

const H2 = styled.h2`
    margin: 10px 0;
    font-size: 2.25em;
    line-height: 1;
    font-weight: 300;
`;

export default Clock;
