import React from 'react';
import styled from 'styled-components';

import useCalendar from 'hooks/useCalendar';

import CalendarEvent from './CalendarEvent/CalendarEvent';

const Calendar: React.FC = () => {
    const { handleAuthClick, isSignedIn, events } = useCalendar();

    const eventList = events.map((event) => {
        return <CalendarEvent name={event.name} date={event.date} />;
    });

    const calendarContent = isSignedIn ? (
        eventList
    ) : (
        <Authorize onClick={handleAuthClick}>Click here to authorize</Authorize>
    );
    return <CalendarStyled>{calendarContent}</CalendarStyled>;
};

const CalendarStyled = styled.div`
    grid-area: calendar;
    background-color: ${({ theme }): string => theme.colors.calendarBg};

    display: flex;
    flex-flow: column;
    align-items: left;

    padding: 10px;
    box-sizing: border-box;

    overflow-y: auto;
`;

const Authorize = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default Calendar;
