export interface Event {
    name: string;
    date: string;
}

export interface UseCalendar {
    handleAuthClick: () => void;
    isSignedIn: boolean;
    events: Event[];
}
