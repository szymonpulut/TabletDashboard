import React from 'react';
import { format, isToday, isTomorrow } from 'date-fns';

import { UseCalendar, Event } from 'types/Calendar';

import secrets from 'utils/secrets.json';

const calendarDiscoveryDocs = [
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
];
const calendarScopes = 'https://www.googleapis.com/auth/calendar.readonly';
const updateIntervalInMs = 15 * 60 * 1000;

const dateToString = (date: Date): string => {
    if (isToday(date)) return `Today, ${format(date, 'H:mm')}`;
    if (isTomorrow(date)) return `Tomorrow, ${format(date, 'H:mm')}`;
    return format(date, 'EEEE, H:mm, d MMMM y');
};

const useCalendar = (): UseCalendar => {
    const [isSignedIn, setIsSignedIn] = React.useState(false);
    const [events, setEvents] = React.useState<Event[]>([]);

    const updateSigninStatus = (success: boolean): void => {
        if (success) {
            setIsSignedIn(true);
        } else {
            setIsSignedIn(false);
        }
    };

    const initClient = (): void => {
        gapi.client
            .init({
                clientId: secrets.googleCalendarApi.clientId,
                discoveryDocs: calendarDiscoveryDocs,
                scope: calendarScopes,
            })
            .then(() => {
                gapi.auth2
                    .getAuthInstance()
                    .isSignedIn.listen(updateSigninStatus);

                updateSigninStatus(
                    gapi.auth2.getAuthInstance().isSignedIn.get(),
                );
            });
    };

    const handleClientLoad = (): void => {
        gapi.load('client:auth2', initClient);
    };

    React.useEffect(() => {
        const scriptApi = document.createElement('script');
        const scriptPlatform = document.createElement('script');

        scriptApi.src = 'https://apis.google.com/js/api.js';
        scriptPlatform.src = 'https://apis.google.com/js/platform.js';

        scriptApi.async = true;
        scriptPlatform.async = true;
        scriptApi.defer = true;
        scriptPlatform.defer = true;
        scriptApi.onload = handleClientLoad;

        document.body.appendChild(scriptApi);
        document.body.appendChild(scriptPlatform);

        return (): void => {
            document.body.removeChild(scriptApi);
            document.body.removeChild(scriptPlatform);
        };
    }, []);

    const handleAuthClick = (): void => {
        gapi.auth2.getAuthInstance().signIn();
    };

    const listUpcomingEvents = (): void => {
        // @ts-ignore
        gapi.client.calendar.events
            .list({
                calendarId: 'primary',
                timeMin: new Date().toISOString(),
                showDeleted: false,
                singleEvents: true,
                maxResults: 10,
                orderBy: 'startTime',
            })
            .then((response: any) => {
                const fetchedEvents = response.result.items;
                const newEvents: Event[] = [];

                for (let i = 0; i < fetchedEvents.length; i++) {
                    const currentEvent = fetchedEvents[i];
                    const date =
                        currentEvent.start.dateTime || currentEvent.start.date;
                    const dateObj = new Date(date);

                    const stringDate = dateToString(dateObj);

                    newEvents[i] = {
                        name: currentEvent.summary,
                        date: stringDate,
                    };
                }

                setEvents(newEvents);
            });
    };

    const fetchCalendar = React.useEffect(() => {
        if (isSignedIn) {
            listUpcomingEvents();
            const timeIntervalId = setInterval(() => {
                listUpcomingEvents();
            }, updateIntervalInMs);

            return (): void => {
                clearInterval(timeIntervalId);
            };
        }
    }, [isSignedIn]);

    return { handleAuthClick, isSignedIn, events };
};

export default useCalendar;
