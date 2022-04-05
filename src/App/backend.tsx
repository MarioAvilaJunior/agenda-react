export interface ICalendar {
  id: number;
  name: string;
  color: string;
}

export interface IEvent {
  id: number;
  date: string;
  time?: string;
  desc: string;
  calendarId: number;
}

export const getCalendarsEndpoint = (): Promise<ICalendar[]> => {
  return fetch("http://localhost:8080/calendars").then((resp) => {
    return resp.json();
  });
};

export const getEventsEndpoint = (): Promise<IEvent[]> => {
  return fetch("http://localhost:8080/events").then((resp) => {
    return resp.json();
  });
};
