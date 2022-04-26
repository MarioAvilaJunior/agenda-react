import Box from "@material-ui/core/Box";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { ICalendar } from "./backend";

interface ICalendarsViewProps {
  calendars: ICalendar[];
  toggleCalendar: (i: number) => void;
  selectedCalendars: boolean[];
}

const CalendarsView = (props: ICalendarsViewProps) => {
  const { calendars, toggleCalendar, selectedCalendars } = props;

  return (
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
                onChange={() => toggleCalendar(index)}
              />
            }
            label={calendar.name}
          />
        </div>
      ))}
    </Box>
  );
};

export default CalendarsView;
