import React from 'react';
import styled from 'styled-components';

import useMqttSubscription from 'hooks/useMqttSusbscription';

import SensorListEntry from './SensorListEntry/SensorListEntry';

interface Props {
    onClick: () => void;
}

const SensorList: React.FC<Props> = ({ onClick }: Props) => {
    const { lastMessageOnTopic: insideTemp } = useMqttSubscription(
        'esp/ThermometerHall/temperature',
    );

    const { lastMessageOnTopic: outsideTemp } = useMqttSubscription(
        'esp/TreeLight/temperature/temp0',
    );

    const { lastMessageOnTopic: szymonTemp } = useMqttSubscription(
        'Szymon/Room/ESP/1/Temperature',
    );

    const { lastMessageOnTopic: garageTemp } = useMqttSubscription(
        'esp/OpenGates/temperature/temp0',
    );

    return (
        <SensorListStyled onClick={onClick}>
            <SensorListEntry name="Inside" temp={insideTemp?.message} />
            <SensorListEntry name="Outside" temp={outsideTemp?.message} />
            <SensorListEntry name="Szymon" temp={szymonTemp?.message} />
            <SensorListEntry name="Garage" temp={garageTemp?.message} />
        </SensorListStyled>
    );
};

const SensorListStyled = styled.div`
    grid-area: sensor-list;
    background-color: ${({ theme }): string => theme.colors.sensorsBg};

    display: flex;
    flex-flow: column;
    align-items: left;
    justify-content: center;

    padding: 20px;
    box-sizing: border-box;
`;

export default SensorList;
