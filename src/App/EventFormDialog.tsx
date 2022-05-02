import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { ICalendar } from "./backend";

interface IEventFormDialogProps {
  event: IEventBeingEdited | null;
  onClose: () => void;
  calendars: ICalendar[];
}

export interface IEventBeingEdited {
  id?: number;
  date: string;
  time?: string;
  desc: string;
  calendarId: number;
}

const EventFormDialog = (props: IEventFormDialogProps) => {
  const [event, setEvent] = useState<IEventBeingEdited | null>(props.event);

  useEffect(() => {
    setEvent(props.event);
  }, [props.event]);

  return (
    <div>
      <Dialog
        open={!!event}
        // A linha acima é a mesma coisa que open={event !== null}
        onClose={props.onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Novo Evento</DialogTitle>
        <DialogContent>
          {event && (
            <>
              <TextField
                type="date"
                margin="normal"
                label="Data"
                fullWidth
                value={event.date}
                onChange={(evt) =>
                  setEvent({ ...event, date: evt.target.value })
                }
              />
              <TextField
                autoFocus
                margin="normal"
                label="Descrição"
                fullWidth
                value={event.desc}
                onChange={(evt) =>
                  setEvent({ ...event, desc: evt.target.value })
                }
              />
              <TextField
                type="time"
                margin="normal"
                label="Hora"
                fullWidth
                value={event.time ?? ""}
                onChange={(evt) =>
                  setEvent({ ...event, time: evt.target.value })
                }
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="select-calendar">Agenda</InputLabel>
                <Select
                  labelId="select-calendar"
                  id="demo-simple-select"
                  value={event.calendarId}
                  onChange={(evt) =>
                    setEvent({
                      ...event,
                      calendarId: evt.target.value as number,
                    })
                  }
                >
                  {props.calendars.map((calendar, index) => {
                    return (
                      <MenuItem value={index} key={calendar.id}>
                        {calendar.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Cancelar</Button>
          <Button onClick={props.onClose} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default EventFormDialog;
