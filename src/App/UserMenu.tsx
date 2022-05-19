import React, { useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { signOutEndpoint } from "./backend";
import { authContext } from "./authContext";

const useStyles = makeStyles({
  userMenu: {
    padding: "16px",
    textAlign: "center",
    borderBottom: "1px solid rgb(224, 224, 224)",
  },
  userDetails: {
    borderBottom: "1px solid rgb(224, 224, 224)",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      marginBottom: "8px",
    },
  },
});

const UserMenu = () => {
  const { user, signOut } = useContext(authContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSignOut = () => {
    signOutEndpoint();
    signOut();
  };

  const classes = useStyles();

  return (
    <div>
      <IconButton aria-label="Usuário" onClick={handleClick}>
        <Icon>person</Icon>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Box className={classes.userDetails}>
          <Avatar>
            <Icon>person</Icon>
          </Avatar>
          <div>{user.name}</div>
          <small>{user.email}</small>
        </Box>
        <MenuItem onClick={onSignOut}>Sair</MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
