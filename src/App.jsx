import React, { useState } from "react";
import ScheduleMeeting from "./Components/ScheduleMeeting";

const App = () => {
  const [meetings, setMeetings] = useState([]);

  const addMeeting = (meeting) => {
    setMeetings([...meetings, meeting]);
  };

  return (
    <div className="container my-5">
      <div className="row">
        <ScheduleMeeting addMeeting={addMeeting} />
      </div>
    </div>
  );
};

export default App;
