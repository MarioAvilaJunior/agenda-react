import React, { useEffect, useRef, useState } from "react";
import Box from "@material-ui/core/Box";
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
import {
  createEventEndpoint,
  ICalendar,
  IEventBeingEdited,
  updateEventEndpoint,
  deleteEventEndpoint,
} from "./backend";

interface IEventFormDialogProps {
  event: IEventBeingEdited | null;
  onCancel: () => void;
  onSave: () => void;
  calendars: ICalendar[];
}

interface IErrorValidation {
  [field: string]: string;
}

const EventFormDialog = (props: IEventFormDialogProps) => {
  const [event, setEvent] = useState<IEventBeingEdited | null>(props.event);
  const [errors, setErrors] = useState<IErrorValidation>({});
  const inputDate = useRef<HTMLInputElement | null>();
  const inputDesc = useRef<HTMLInputElement | null>();

  useEffect(() => {
    setEvent(props.event);
    setErrors({});
  }, [props.event]);

  const isNewEvent = !event?.id;

  const validate = (): boolean => {
    if (event) {
      const currentErrors: IErrorValidation = {};
      if (!event.date) {
        currentErrors["date"] = "A data deve ser preenchida";
        inputDate.current?.focus();
      }
      if (!event.desc) {
        currentErrors["desc"] = "A descrição deve ser preenchida";
        inputDesc.current?.focus();
      }
      setErrors(currentErrors);
      return Object.keys(currentErrors).length === 0;
    }
    return false;
  };

  const save = (evt: React.FormEvent) => {
    evt.preventDefault();
    if (event && validate()) {
      if (isNewEvent) {
        createEventEndpoint(event).then(props.onSave);
      } else {
        updateEventEndpoint(event).then(props.onSave);
      }
    }
  };

  const deleteEvent = () => {
    if (event) {
      deleteEventEndpoint(event.id!).then(props.onSave);
    }
  };

  return (
    <div>
      <Dialog
        open={!!event}
        // A linha acima é a mesma coisa que open={event !== null}
        onClose={props.onCancel}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={save}>
          <DialogTitle id="form-dialog-title">
            {isNewEvent ? "Criar Evento" : "Editar Evento"}
          </DialogTitle>
          <DialogContent>
            {event && (
              <>
                <TextField
                  inputRef={inputDate}
                  type="date"
                  margin="normal"
                  label="Data"
                  fullWidth
                  value={event.date}
                  onChange={(evt) =>
                    setEvent({ ...event, date: evt.target.value })
                  }
                  error={!!errors.date}
                  helperText={errors.date}
                />
                <TextField
                  inputRef={inputDesc}
                  autoFocus
                  margin="normal"
                  label="Descrição"
                  fullWidth
                  value={event.desc}
                  onChange={(evt) =>
                    setEvent({ ...event, desc: evt.target.value })
                  }
                  error={!!errors.desc}
                  helperText={errors.desc}
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
                    {props.calendars.map((calendar) => {
                      return (
                        <MenuItem value={calendar.id} key={calendar.id}>
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
            {!isNewEvent && (
              <Button type="button" onClick={deleteEvent}>
                Excluir
              </Button>
            )}
            <Box flex="1"></Box>
            <Button type="button" onClick={props.onCancel}>
              Cancelar
            </Button>
            <Button type="submit" color="primary">
              Salvar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
export default EventFormDialog;
