import React, { useState } from "react";
import ScheduleMeeting from "./Components/ScheduleMeeting";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const App = () => {
  const [meetings, setMeetings] = useState([]);

  const addMeeting = (meeting) => {
    setMeetings([...meetings, meeting]);
  };

  return (
    <div>
      <Navbar />
      <div className="container my-5">
        <div className="row">
          <ScheduleMeeting addMeeting={addMeeting} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
