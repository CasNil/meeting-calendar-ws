import React, { useState } from "react";
import ScheduleMeeting from "./Components/ScheduleMeeting";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import MeetingList from "./Components/MeetingList";

const App = () => {
  const [meetings, setMeetings] = useState([]);

  const addMeeting = (meeting) => {
    setMeetings([...meetings, meeting]);
  };

  return (
    <div
    className="d-flex flex-column min-vh-100"
    >
      <Navbar />
      <div className="container my-5 flex-grow-1">
        <div className="row">
          <ScheduleMeeting addMeeting={addMeeting} />
        </div>
        <div className="row">
          <MeetingList meetings={meetings}/>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
