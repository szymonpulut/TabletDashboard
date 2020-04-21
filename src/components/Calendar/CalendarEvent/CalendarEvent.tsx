import React from 'react';
import styled from 'styled-components';

interface Props {
    name: string;
    date: string;
}

const CalendarEvent: React.FC<Props> = ({ name, date }: Props) => {
    return (
        <CalendarEventStyled>
            <EventDate>{date}</EventDate>
            <EventName>{name}</EventName>
        </CalendarEventStyled>
    );
};

const CalendarEventStyled = styled.div`
    display: flex;
    flex-flow: column;
    padding: 8px;
`;

const EventDate = styled.span`
    font-size: 0.9em;
`;

const EventName = styled.span`
    font-size: 0.7em;
`;

export default CalendarEvent;
