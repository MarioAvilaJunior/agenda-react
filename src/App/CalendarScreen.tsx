import React, { JSXElementConstructor } from "react";
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

const WEEK_DAYS: string[] = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

const useStyles: () => ClassNameMap<"table"> = makeStyles({
  table: {
    borderTop: "1px solid rgb(224, 224, 224)",
    minHeight: "100%",
    "& td ~ td, & th ~ th": { borderLeft: "1px solid rgb(224, 224, 224)" },
  },
});

const CalendarScreen = (): JSX.Element => {
  const classes = useStyles();

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
          <FormControlLabel control={<Checkbox />} label="Pessoal" />
          <FormControlLabel control={<Checkbox />} label="Trabalho" />
        </Box>
      </Box>
      <TableContainer component="div">
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
            <TableRow>
              <TableCell component="th" scope="row"></TableCell>
              <TableCell align="right">Teste</TableCell>
              <TableCell align="right">Teste</TableCell>
              <TableCell align="right">Teste</TableCell>
              <TableCell align="right">Teste</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CalendarScreen;
