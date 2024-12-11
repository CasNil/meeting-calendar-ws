import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BsCalendar2Week } from "react-icons/bs";

const MeetingForm = ({ reloadMeetings }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const apiEndpoint = "http://localhost:8080/api/meetings";

  const addMeeting = async (data) => {
    try {
      const response = await axios.post(apiEndpoint, data);
      console.log("Meeting created successfully: ", response.data);
      reloadMeetings();
    } catch (error) {
      console.error("Error creating meeting: ", error);
    }
  };

  const onSubmit = (data) => {
    addMeeting(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="col-md-12 mb-2">
        <div>
          <div
            style={{
              backgroundColor: "blue",
              border: "2px solid",
              borderRadius: "6px",
              padding: "10px",
              color: "white",
            }}
          >
            <h2 className="d-flex align-items-center">
              <BsCalendar2Week style={{ marginRight: "10px" }} />
              Schedule a New Meeting
            </h2>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Meeting Title</label>
        <input
          {...register("title", {
            required: "Title is required",
          })}
          placeholder="Enter meeting title"
          type="text"
          className={`form-control ${errors.title ? "is-invalid" : ""}`}
        />
        {errors.title && (
          <div className="invalid-feedback">{errors.title.message}</div>
        )}
      </div>
      <div className="row">
        <div className="mb-3 col-md-6">
          <label className="form-label">Meeting Date</label>
          <input
            {...register("date", {
              required: "Date is required",
              validate: {
                notPastDate: (value) => {
                  const today = new Date();
                  const selectedDate = new Date(value);
                  return (
                    selectedDate >= today.setHours(0, 0, 0, 0) ||
                    "Date cannot be in the past"
                  );
                },
              },
            })}
            type="date"
            className={`form-control ${errors.date ? "is-invalid" : ""}`}
          />
          {errors.date && (
            <div className="invalid-feedback">{errors.date.message}</div>
          )}
        </div>
        <div className="mb-3 col-md-6">
          <label className="form-label">Meeting Time</label>
          <input
            {...register("time", {
              required: "Time is required",
              validate: {
                notPastTime: (value) => {
                  const today = new Date();
                  const selectedDate = watch("date");
                  if (!selectedDate) return "Please select a date first";

                  const selectedDateTime = new Date(`${selectedDate}T${value}`);
                  return (
                    selectedDateTime >= today || "Time must be in the future"
                  );
                },
              },
            })}
            type="time"
            className={`form-control ${errors.time ? "is-invalid" : ""}`}
          />
          {errors.time && (
            <div className="invalid-feedback">{errors.time.message}</div>
          )}
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Meeting Level</label>
        <select
          {...register("level", { required: "Level is required" })}
          className={`form-control ${errors.level ? "is-invalid" : ""}`}
        >
          <option value="">Choose Level</option>
          <option value={"Team"}>Team</option>
          <option value={"Department"}>Department</option>
          <option value={"Company"}>Company</option>
        </select>
        {errors.level && (
          <div className="invalid-feedback">{errors.level.message}</div>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Participants</label>
        <input
          {...register("participants", {
            required: "Participants are required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Email is invalid",
            },
          })}
          placeholder="Enter participant emails"
          type="text"
          className={`form-control ${errors.participants ? "is-invalid" : ""}`}
        />
        {errors.participants && (
          <div className="invalid-feedback">{errors.participants.message}</div>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 5,
              message: "Description is too short",
            },
          })}
          placeholder="Enter meeting description"
          type="text"
          className={`form-control ${errors.description ? "is-invalid" : ""}`}
          rows="3"
        />
        {errors.description && (
          <div className="invalid-feedback">{errors.description.message}</div>
        )}
      </div>
      <button type="submit" className="btn btn-primary">
        Create Meeting
      </button>
    </form>
  );
};

export default MeetingForm;
