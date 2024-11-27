import React from "react";
import MeetingForm from "./MeetingForm";
import { BsCalendar2Week } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";

const ScheduleMeeting = ({ addMeeting }) => {
  return (
    <div className="col-md-12 mb-4">
      <div className="card">
        <div
          className="card-header"
          style={{
            backgroundColor: "blue",
            border: "2px solid",
            borderRadius: "5px",
            padding: "10px",
            color: "white",
          }}
        >
          <h2 className="d-flex align-items-center">
            <BsCalendar2Week style={{ marginRight: "10px" }} />
            Schedule a New Meeting
          </h2>
        </div>

        <div className="card-body">
          <MeetingForm addMeeting={addMeeting} />
        </div>
      </div>
    </div>
  );
};

export default ScheduleMeeting;
