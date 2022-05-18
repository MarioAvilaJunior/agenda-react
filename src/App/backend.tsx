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

export interface IUser {
  name: string;
  email: string;
}

export const getCalendarsEndpoint = (): Promise<ICalendar[]> => {
  return fetch("http://localhost:8080/calendars", {
    credentials: "include",
  }).then((resp) => {
    return resp.json();
  });
};

export const getEventsEndpoint = (
  startDate: string,
  endDate: string
): Promise<IEvent[]> => {
  return fetch(
    `http://localhost:8080/events?date_gte=${startDate}&date_lte=${endDate}&_sort=date,time`,
    { credentials: "include" }
  ).then(responseHandler);
};

export const createEventEndpoint = (
  event: IEventBeingEdited
): Promise<IEvent> => {
  return fetch(`http://localhost:8080/events`, {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  }).then(responseHandler);
};

export const updateEventEndpoint = (
  event: IEventBeingEdited
): Promise<IEvent> => {
  return fetch(`http://localhost:8080/events/${event.id}`, {
    credentials: "include",
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  }).then(responseHandler);
};

export const deleteEventEndpoint = (eventId: number): Promise<void> => {
  return fetch(`http://localhost:8080/events/${eventId}`, {
    credentials: "include",
    method: "DELETE",
  }).then(responseHandler);
};

export const getUserEndpoint = (): Promise<IUser> => {
  return fetch(`http://localhost:8080/auth/user`, {
    credentials: "include",
  }).then(responseHandler);
};

export const signInEndpoint = (
  email: string,
  password: string
): Promise<IUser> => {
  return fetch(`http://localhost:8080/auth/login`, {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(responseHandler);
};

export const signOutEndpoint = (): Promise<IUser> => {
  return fetch(`http://localhost:8080/auth/logout`, {
    credentials: "include",
    method: "POST",
  }).then(responseHandler);
};

const responseHandler = (resp: Response) => {
  if (resp.ok) {
    return resp.json();
  } else {
    throw new Error(resp.statusText);
  }
};
