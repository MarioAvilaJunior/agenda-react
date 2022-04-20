import React from "react";
import { getEventsEndpoint } from "./backend";
import CalendarScreen from "./CalendarScreen";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { getToday } from "./dateFunctions";

function App() {
  const yearAndMonth = getToday().substring(0, 7);
  //const yearAndMonth = "2021-06";
  console.log(yearAndMonth);
  return (
    <Router>
      <Routes>
        <Route path={`calendar`}>
          <Route path={`:yearAndMonth`} element={<CalendarScreen />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
