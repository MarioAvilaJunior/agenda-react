import Box from "@material-ui/core/Box";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import { addMonths, formatMonth } from "./dateFunctions";
import UserMenu from "./UserMenu";

interface ICalendarHeaderProps {
  yearAndMonth: string;
}

const CalendarHeader = (props: ICalendarHeaderProps) => {
  const { yearAndMonth } = props;
  return (
    <Box display="flex" alignItems="center" padding="8px 16px">
      <Box>
        <IconButton
          aria-label="Mês anterior"
          component={Link}
          to={"/calendar/" + addMonths(yearAndMonth, -1)}
        >
          <Icon>chevron_left</Icon>
        </IconButton>
        <IconButton
          aria-label="Próximo mês"
          component={Link}
          to={"/calendar/" + addMonths(yearAndMonth, 1)}
        >
          <Icon>chevron_right</Icon>
        </IconButton>
      </Box>
      <Box flex="1" marginLeft="16px" component="h3">
        {formatMonth(yearAndMonth)}
      </Box>
      <UserMenu />
    </Box>
  );
};

export default CalendarHeader;
