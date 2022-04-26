import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { getCalendarsEndpoint, getEventsEndpoint, ICalendar } from "./backend";
import { IEvent } from "./backend";
import { useParams } from "react-router-dom";
import CalendarsView from "./CalendarsView";
import CalendarHeader from "./CalendarHeader";
import Calendar from "./Calendar";
import { ICalendarCell, IEventWithCalendar } from "./Calendar";

const generateCalendar = (
  date: string,
  selectedCalendars: boolean[],
  calendars: ICalendar[],
  allEvents: IEvent[]
): ICalendarCell[][] => {
  const weeks: ICalendarCell[][] = [];
  const jsDate = new Date(date + "T12:00:00");
  const currentMonth = jsDate.getMonth();
  const currentDay = new Date(jsDate.valueOf());
  currentDay.setDate(1);
  const weekDay = currentDay.getDay();
  currentDay.setDate(1 - weekDay);

  do {
    const week: ICalendarCell[] = [];
    for (let i = 0; i < 7; i++) {
      const monthString = (currentDay.getMonth() + 1)
        .toString()
        .padStart(2, "0");
      const dayString = (currentDay.getDate() + 1).toString().padStart(2, "0");
      const isoDate = `${currentDay.getFullYear()}-${monthString}-${dayString}`;

      const events: IEventWithCalendar[] = [];

      for (const event of allEvents) {
        if (event.date === isoDate) {
          const calendarIndex = calendars.findIndex(
            (calendar) => calendar.id === event.calendarId
          );
          if (selectedCalendars[calendarIndex]) {
            events.push({ ...event, calendar: calendars[calendarIndex] });
          }
        }
      }

      week.push({
        date: isoDate,
        dayOfMonth: currentDay.getDate(),
        events: events,
      });
      currentDay.setDate(currentDay.getDate() + 1);
    }
    weeks.push(week);
  } while (currentDay.getMonth() === currentMonth);

  return weeks;
};

const CalendarScreen = (): JSX.Element => {
  const { yearAndMonth } = useParams() as { yearAndMonth: string };
  //const yearAndMonth = "2021-06-01";

  const [calendars, setCalendars] = useState<ICalendar[]>([]);
  const [selectedCalendars, setSelectedCalendars] = useState<boolean[]>([]);
  const [events, setEvents] = useState<IEvent[]>([]);
  const weeks = generateCalendar(
    yearAndMonth + "-01",
    selectedCalendars,
    calendars,
    events
  );
  const startDate = weeks[0][0].date;
  const endDate = weeks[weeks.length - 1][6].date;

  const toogleCalendar = (index: number) => {
    const selectedCalendarsCopy = [...selectedCalendars];
    selectedCalendarsCopy[index] = !selectedCalendarsCopy[index];
    setSelectedCalendars(selectedCalendarsCopy);
  };

  useEffect(() => {
    Promise.all([
      getCalendarsEndpoint(),
      getEventsEndpoint(startDate, endDate),
    ]).then(([calendars, events]) => {
      setSelectedCalendars(calendars.map(() => true));
      setCalendars(calendars);
      setEvents(events);
    });
  }, [startDate, endDate]);

  return (
    <Box display="flex" height="100%" alignItems="stretch">
      <Box
        borderRight="1px solid rgb(224, 224, 224)"
        width="16em"
        padding="8px 16px"
      >
        <h2>Agenda React</h2>
        <Button variant="contained" color="primary">
          Novo evento
        </Button>
        <CalendarsView
          calendars={calendars}
          toggleCalendar={toogleCalendar}
          selectedCalendars={selectedCalendars}
        />
      </Box>
      <Box flex="1" display="flex" flexDirection="column">
        <CalendarHeader yearAndMonth={yearAndMonth} />
        <Calendar weeks={weeks} />
      </Box>
    </Box>
  );
};

export default CalendarScreen;
