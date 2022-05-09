export interface ICalendar {
  id: number;
  name: string;
  color: string;
}

export interface IEventBeingEdited {
  id?: number;
  date: string;
  time?: string;
  desc: string;
  calendarId: number;
}

export interface IEvent extends IEventBeingEdited {
  id: number;
}

export const getCalendarsEndpoint = (): Promise<ICalendar[]> => {
  return fetch("http://localhost:8080/calendars").then((resp) => {
    return resp.json();
  });
};

export const getEventsEndpoint = (
  startDate: string,
  endDate: string
): Promise<IEvent[]> => {
  return fetch(
    `http://localhost:8080/events?date_gte=${startDate}&date_lte=${endDate}&_sort=date,time`
  ).then((resp) => {
    return resp.json();
  });
};

export const createEventEndpoint = (
  event: IEventBeingEdited
): Promise<IEvent> => {
  return fetch(`http://localhost:8080/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  }).then((resp) => {
    return resp.json();
  });
};

export const updateEventEndpoint = (
  event: IEventBeingEdited
): Promise<IEvent> => {
  return fetch(`http://localhost:8080/events/${event.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  }).then((resp) => {
    return resp.json();
  });
};

export const deleteEventEndpoint = (eventId: number): Promise<void> => {
  return fetch(`http://localhost:8080/events/${eventId}`, {
    method: "DELETE",
  }).then((resp) => {
    return resp.json();
  });
};
