import { Button } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import React, { useState } from "react";
import { IUser, signInEndpoint } from "./backend";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  error: {
    background: "rgb(253, 236, 234)",
    borderRadius: "4px",
    padding: "16px",
    margin: "16px 0",
  },
});

interface ILoginScreenProps {
  onSignIn: (user: IUser) => void;
}

const LoginScreen = (props: ILoginScreenProps) => {
  const classes = useStyles();

  const [email, setEmail] = useState<string>("danilo@email.com");
  const [password, setPassword] = useState<string>("1234");
  const [error, setError] = useState<string>("");

  const emailHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };

  const signIn = (event: React.FormEvent) => {
    event.preventDefault();
    signInEndpoint(email, password).then(
      (user) => {
        props.onSignIn(user);
        console.log(user);
      },
      (e) => {
        setError("E-mail não encontrado ou senha incorreta");
        console.error(e);
      }
    );
  };

  return (
    <Container maxWidth="sm">
      <h1>Agenda React</h1>
      <p>
        Digite e-mail e senha para entrar no sistema. Para testar, use o e-mail{" "}
        <kbd>mario@email.com</kbd> e a senha <kbd>1234</kbd>
      </p>
      <form onSubmit={signIn}>
        <TextField
          margin="normal"
          label="E-mail"
          fullWidth
          variant="outlined"
          value={email}
          onChange={emailHandler}
        />
        <TextField
          type="password"
          margin="normal"
          label="Password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={passwordHandler}
        />
        {error && <div className={classes.error}>{error}</div>}
        <Box textAlign="right" marginTop="16px">
          <Button type="submit" variant="contained" color="primary">
            Entrar
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default LoginScreen;
