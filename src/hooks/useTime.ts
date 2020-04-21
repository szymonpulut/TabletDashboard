import React from 'react';
import { format } from 'date-fns';

const useTime = (): { time: string; date: string } => {
    const updateIntervalInMs = 5000;

    const getTimeTextFromDate = (date: Date): string => {
        const timeText = format(date, 'HH:mm');
        return timeText;
    };

    const getDateTextFromDate = (date: Date): string => {
        const dateText = format(date, 'EEEE, MMMM d');
        return dateText;
    };

    const [timeText, setTimeText] = React.useState(
        getTimeTextFromDate(new Date()),
    );

    const [dateText, setDateText] = React.useState(
        getDateTextFromDate(new Date()),
    );

    const tick = (): void => {
        const newTimeText = getTimeTextFromDate(new Date());
        const newDateText = getDateTextFromDate(new Date());

        setTimeText(newTimeText);
        setDateText(newDateText);
    };

    const setTimer = React.useEffect(() => {
        const timeIntervalId = setInterval(() => {
            tick();
        }, updateIntervalInMs);

        return (): void => {
            clearInterval(timeIntervalId);
        };
    }, []);

    return { time: timeText, date: dateText };
};

export default useTime;
