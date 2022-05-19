import React, { useEffect, useState } from "react";
import { getUserEndpoint, IUser } from "./backend";
import CalendarScreen from "./CalendarScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getToday } from "./dateFunctions";
import LoginScreen from "./LoginScreen";
import { authContext } from "./authContext";

function App() {
  const yearAndMonth = getToday().substring(0, 7);
  const [user, setUser] = useState<IUser | null>(null);

  const signOut = () => {
    setUser(null);
  };

  useEffect(() => {
    getUserEndpoint().then(setUser, signOut);
  }, []);

  if (user) {
    return (
      <authContext.Provider value={{ user, signOut }}>
        <Router>
          <Routes>
            <Route path={`calendar`}>
              <Route path={`:yearAndMonth`} element={<CalendarScreen />} />
            </Route>
          </Routes>
        </Router>
      </authContext.Provider>
    );
  }
  return <LoginScreen onSignIn={(user) => setUser(user)} />;
}

export default App;
