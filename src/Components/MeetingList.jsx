import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CiEdit, CiTrash } from "react-icons/ci";

const MeetingList = ({ meetings }) => {
  return (
    <div className="col-md-12">
      <div
        className="border p-3"
        style={{
          borderRadius: "5px",
          backgroundColor: "white",
        }}
      >
        <h2>List of Created Meetings</h2>
        <table className="table table-white">
          <thead>
            <tr>
              <th>#</th>
              <th>Meeting Title</th>
              <th>Date</th>
              <th>Time</th>
              <th>Level</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{meeting.title}</td>
                <td>{meeting.date}</td>
                <td>{meeting.time}</td>
                <td>{meeting.level}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2">
                    <CiEdit />
                  </button>
                  <button className="btn btn-danger btn-sm">
                    <CiTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MeetingList;
