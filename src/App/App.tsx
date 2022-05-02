import React from "react";
import { getEventsEndpoint } from "./backend";
import CalendarScreen from "./CalendarScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getToday } from "./dateFunctions";

function App() {
  const yearAndMonth = getToday().substring(0, 7);

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
