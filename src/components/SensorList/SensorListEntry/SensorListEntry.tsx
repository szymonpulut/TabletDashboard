import React from 'react';
import styled from 'styled-components';

interface Props {
    name?: string;
    temp?: number | null;
}

const SensorListEntry: React.FC<Props> = ({ name, temp }: Props) => {
    let tempNew = temp?.toString();
    if (typeof temp === 'number') tempNew = temp?.toFixed(1).toString();
    return (
        <SensorListEntryStyled>
            {name}: {tempNew}&#176;C
        </SensorListEntryStyled>
    );
};

const SensorListEntryStyled = styled.span`
    padding: 10px 0;
    font-size: 1.5em;
`;

export default SensorListEntry;
