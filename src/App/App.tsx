import React, { useEffect, useState } from "react";
import { getEventsEndpoint, getUserEndpoint, IUser } from "./backend";
import CalendarScreen from "./CalendarScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getToday } from "./dateFunctions";
import LoginScreen from "./LoginScreen";

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
      <Router>
        <Routes>
          <Route path={`calendar`}>
            <Route
              path={`:yearAndMonth`}
              element={<CalendarScreen onSignOut={signOut} user={user} />}
            />
          </Route>
        </Routes>
      </Router>
    );
  }
  return <LoginScreen onSignIn={(user) => setUser(user)} />;
}

export default App;
