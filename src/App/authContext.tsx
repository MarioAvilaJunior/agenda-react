import React from "react";
import { IUser } from "./backend";

export interface IAuthContext {
  user: IUser;
  signOut: () => void;
}

export const authContext = React.createContext<IAuthContext>({
  user: {
    name: "Mario",
    email: "mario@email.com",
  },
  signOut: () => {},
});
