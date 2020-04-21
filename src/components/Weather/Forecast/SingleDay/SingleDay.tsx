import React from 'react';
import styled from 'styled-components';

interface Props {
    temp: number;
    image: string;
}

const SingleDay: React.FC<Props> = ({ temp, image }: Props) => {
    return (
        <SingleDayStyled>
            <Image src={image} />
            <TemperatureText>{temp}&#176;C</TemperatureText>
        </SingleDayStyled>
    );
};

const SingleDayStyled = styled.div`
    width: 25%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
    margin: 10px;
    padding: 3px 0;
`;

const Image = styled.img`
    height: 75%;
    width: 75%;
`;

const TemperatureText = styled.span``;

export default SingleDay;
