import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const MeetingForm = ({ addMeeting }) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    level: "",
    participants: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMeeting(formData);

    setFormData({
      title: "",
      date: "",
      time: "",
      level: "",
      participants: "",
      description,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Meeting Title</label>
        <input
          placeholder="Enter meeting title"
          type="text"
          className="form-control"
          onChange={handleChange}
          name="title"
          value={formData.title}
          required
        />
      </div>
      <div className="row">
        <div className="mb-3 col-md-6">
          <label className="form-label">Meeting Date</label>
          <input
            type="date"
            className="form-control"
            onChange={handleChange}
            name="date"
            value={formData.date}
            required
          />
        </div>
        <div className="mb-3 col-md-6">
          <label className="form-label">Meeting Time</label>
          <input
            type="time"
            className="form-control"
            onChange={handleChange}
            name="time"
            value={formData.time}
            required
          />
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Meeting Level</label>
        <select
          className="form-control"
          onChange={handleChange}
          name="level"
          value={formData.level}
          required
        >
          <option value="">Choose Level</option>
          <option value={"team"}>Team</option>
          <option value={"department"}>Department</option>
          <option value={"company"}>Company</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Participants</label>
        <input
          placeholder="Enter participant emails"
          type="text"
          className="form-control"
          onChange={handleChange}
          name="participants"
          value={formData.participants}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          placeholder="Enter meeting description"
          type="text"
          className="form-control"
          onChange={handleChange}
          name="description"
          value={formData.description}
          required
          rows="3"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Create Meeting
      </button>
    </form>
  );
};

export default MeetingForm;
