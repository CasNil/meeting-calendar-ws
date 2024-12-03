import React, { useState } from "react";
import ScheduleMeeting from "./Components/ScheduleMeeting";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import MeetingList from "./Components/MeetingList";
import Dashboard from "./Components/Dashboard";

const App = () => {
  const [meetings, setMeetings] = useState([]);

  const addMeeting = (meeting) => {
    setMeetings([...meetings, meeting]);
  };

  const editMeeting = (id, updatedData) => {
    console.log("Updated data:", updatedData);
    setMeetings((prevMeetings) =>
      prevMeetings.map((meeting) =>
        meeting.id === id ? { ...meeting, ...updatedData } : meeting
      )
    );
  };

  const deleteMeeting = (id) => {
    setMeetings((prev) => prev.filter((meeting) => meeting.id !== id));
  };

  return (
    <div className="d-flex flex-column vh-100">
      <Navbar />

      <div className="container-fluid my-4 flex-grow-1">
        <div className="row">
          <div className="col-md-2">
            <Dashboard />
          </div>
          
          <div className="col-md-10">
            <ScheduleMeeting addMeeting={addMeeting} />
          </div>
        </div>

        <div className="row">
          <MeetingList
            meetings={meetings}
            editMeeting={editMeeting}
            deleteMeeting={deleteMeeting}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
