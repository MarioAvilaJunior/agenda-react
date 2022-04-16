import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import Icon from "@material-ui/core/Icon";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { getCalendarsEndpoint, getEventsEndpoint, ICalendar } from "./backend";
import { IEvent } from "./backend";

const WEEK_DAYS: string[] = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

const useStyles = makeStyles({
  table: {
    borderTop: "1px solid rgb(224, 224, 224)",
    minHeight: "100%",
    tableLayout: "fixed",
    "& td ~ td, & th ~ th": { borderLeft: "1px solid rgb(224, 224, 224)" },
    "& td": { verticalAlign: "top", overflow: "hidden", padding: "8px 4px" },
  },
  dayOfMonth: { fontWeight: 500, marginBottom: "4px" },
  event: {
    display: "flex",
    alignItems: "center",
    background: "none",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    whiteSpace: "nowrap",
    margin: "4px 0",
  },
  eventBackground: {
    display: "inline-block",
    color: "white",
    padding: "2px",
    borderRadius: "4px",
  },
});

type IEventWithCalendar = IEvent & { calendar: ICalendar };

interface ICalendarCell {
  date: string;
  dayOfMonth: number;
  events: IEventWithCalendar[];
}

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
    for (let i = 0; i < WEEK_DAYS.length; i++) {
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

const getToday = (): string => {
  return "2021-06-04" || new Date().toISOString().slice(0, 10);
};

const CalendarScreen = (): JSX.Element => {
  const classes = useStyles();
  const [calendars, setCalendars] = useState<ICalendar[]>([]);
  const [selectedCalendars, setSelectedCalendars] = useState<boolean[]>([]);
  const [events, setEvents] = useState<IEvent[]>([]);
  const weeks = generateCalendar(
    getToday(),
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
        <Box marginTop="64px">
          <h3>Agendas</h3>
          {calendars.map((calendar, index) => (
            <div key={calendar.id}>
              <FormControlLabel
                key={calendar.id}
                control={
                  <Checkbox
                    style={{ color: calendar.color }}
                    checked={selectedCalendars[index]}
                    onChange={() => toogleCalendar(index)}
                  />
                }
                label={calendar.name}
              />
            </div>
          ))}
        </Box>
      </Box>
      <Box flex="1" display="flex" flexDirection="column">
        <Box display="flex" alignItems="center" padding="8px 16px">
          <Box>
            <IconButton aria-label="Mês anterior">
              <Icon>chevron_left</Icon>
            </IconButton>
            <IconButton aria-label="Próximo mês">
              <Icon>chevron_right</Icon>
            </IconButton>
          </Box>
          <Box flex="1" marginLeft="16px" component="h3">
            Abril de 2022
          </Box>
          <IconButton aria-label="Usuário">
            <Avatar>
              <Icon>person</Icon>
            </Avatar>
          </IconButton>
        </Box>
        <TableContainer style={{ flex: "1" }} component="div">
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                {WEEK_DAYS.map((weekDay) => {
                  return (
                    <TableCell align="center" key={weekDay}>
                      {weekDay}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {weeks.map((week, index) => (
                <TableRow key={index}>
                  {week.map((cell) => (
                    <TableCell align="center" key={cell.date}>
                      <div className={classes.dayOfMonth}>
                        {cell.dayOfMonth}
                      </div>
                      {cell.events.map((event) => {
                        const color = event.calendar.color;
                        return (
                          <button className={classes.event} key={event.id}>
                            {event.time && (
                              <>
                                <Icon style={{ color }} fontSize="inherit">
                                  watch_later
                                </Icon>
                                <Box component="span" margin="0 4px">
                                  {event.time}
                                </Box>
                              </>
                            )}
                            {event.time ? (
                              <span>{event.desc}</span>
                            ) : (
                              <span
                                className={classes.eventBackground}
                                style={{ backgroundColor: color }}
                              >
                                {event.desc}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default CalendarScreen;
