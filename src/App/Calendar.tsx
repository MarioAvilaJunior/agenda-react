import React from "react";
import Box from "@material-ui/core/Box";
import Icon from "@material-ui/core/Icon";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import { ICalendar, IEvent } from "./backend";
import { getToday } from "./dateFunctions";

export type IEventWithCalendar = IEvent & { calendar: ICalendar };

export interface ICalendarCell {
  date: string;
  dayOfMonth: number;
  events: IEventWithCalendar[];
}

const WEEK_DAYS: string[] = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

const useStyles = makeStyles({
  table: {
    borderTop: "1px solid rgb(224, 224, 224)",
    minHeight: "100%",
    tableLayout: "fixed",
    "& td ~ td, & th ~ th": { borderLeft: "1px solid rgb(224, 224, 224)" },
    "& td": { verticalAlign: "top", overflow: "hidden", padding: "8px 4px" },
  },
  dayOfMonth: {
    display: "inline-block",
    fontWeight: 500,
    width: "24px",
    lineHeigth: "24px",
    marginBottom: "4px",
    borderRadius: "50%",
    "&.today": {
      backgroundColor: "#3f51b5",
      color: "white",
    },
  },
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

interface ICalendarProps {
  weeks: ICalendarCell[][];
  onClickDay: (date: string) => void;
  onClickEvent: (event: IEvent) => void;
}

const Calendar = (props: ICalendarProps) => {
  const classes = useStyles();
  const { weeks } = props;

  const clickHandler = (evt: React.MouseEvent, date: string) => {
    if (evt.target === evt.currentTarget) {
      props.onClickDay(date);
    }
  };

  return (
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
                <TableCell
                  align="center"
                  key={cell.date}
                  onClick={(mouseEvent) => clickHandler(mouseEvent, cell.date)}
                >
                  <div
                    className={
                      classes.dayOfMonth +
                      (cell.date === getToday() ? " today" : "")
                    }
                  >
                    {cell.dayOfMonth}
                  </div>
                  {cell.events.map((event) => {
                    const color = event.calendar.color;
                    return (
                      <button
                        className={classes.event}
                        key={event.id}
                        onClick={() => props.onClickEvent(event)}
                      >
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
  );
};

export default Calendar;
