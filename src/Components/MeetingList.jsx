import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CiEdit, CiTrash } from "react-icons/ci";
import { useForm } from "react-hook-form";
import axios from "axios";

const MeetingList = ({ meetings, apiEndpoint, reload, setReload }) => {
  const [editingId, setEditingId] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (editingId !== null) {
      const meeting = meetings.find((meeting) => meeting.id === editingId);
      console.log("Selected meeting:", meeting);
      if (meeting) {
        setValue("title", meeting.title);
        setValue("date", meeting.date);
        setValue("time", meeting.time);
        setValue("level", meeting.level);
      }
    } else {
      reset();
    }
  }, [editingId, meetings, setValue, reset]);

  const handleEditClick = (meeting) => {
    setEditingId(meeting.id);
  };

  const handleSave = async (data) => {
    try {
      await axios.put(`${apiEndpoint}/${editingId}`, data);
      setEditingId(null);
      setReload(!reload);
    } catch (error) {
      console.error("Error saving meeting: ", error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleDeleteClick = async (data) => {
    const userConfirmed = window.confirm(
      `Are you sure you want to delete the meeting "${data.title}?"`
    );
    if (userConfirmed) {
      try {
        await axios.delete(`${apiEndpoint}/${data.id}`);
        setReload(!reload);
      } catch (error) {
        console.error("Error deleting meeting: ", error);
      }
    }
  };

  return (
    <div>
      <div
        className="border p-3"
        style={{
          borderRadius: "8px",
          borderColor: "#ddd",
        }}
      >
        <h2>List of Created Meetings</h2>
        <div className="table-responsive">
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
                <tr key={meeting.id}>
                  {editingId === meeting.id ? (
                    <>
                      <td>{index + 1}</td>
                      <td>
                        <input
                          {...register("title", {
                            required: "Title is required",
                          })}
                          type="text"
                          className={`form-control ${
                            errors.title ? "isinvalid" : ""
                          }`}
                        />
                        {errors.title && (
                          <div className="invalid-feedback">
                            {errors.title.message}
                          </div>
                        )}
                      </td>
                      <td>
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
                          className={`form-control ${
                            errors.date ? "is-invalid" : ""
                          }`}
                        />
                        {errors.date && (
                          <div className="invalid-feedback">
                            {errors.date.message}
                          </div>
                        )}
                      </td>
                      <td>
                        <input
                          {...register("time", {
                            required: "Time is required",
                            validate: {
                              notPastTime: (value) => {
                                const today = new Date();
                                const selectedDate = watch("date");
                                if (!selectedDate)
                                  return "Please select a date first";

                                const selectedDateTime = new Date(
                                  `${selectedDate}T${value}`
                                );
                                return (
                                  selectedDateTime >= today ||
                                  "Time must be in the future"
                                );
                              },
                            },
                          })}
                          type="time"
                          className={`form-control ${
                            errors.time ? "is-invalid" : ""
                          }`}
                        />
                        {errors.time && (
                          <div className="invalid-feedback">
                            {errors.time.message}
                          </div>
                        )}
                      </td>
                      <td>
                        <select
                          {...register("level", {
                            required: "Level is required",
                          })}
                          type="text"
                          className={`form-control ${
                            errors.level ? "is-invalid" : ""
                          }`}
                        >
                          <option value="">Select Level</option>
                          <option value="Team">Team</option>
                          <option value="Department">Department</option>
                          <option value="Company">Company</option>
                        </select>
                        {errors.level && (
                          <div className="invalid-feedback">
                            {errors.level.message}
                          </div>
                        )}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-success btn-sm me-2"
                          onClick={handleSubmit(handleSave)}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{index + 1}</td>
                      <td>{meeting.title}</td>
                      <td>{meeting.date}</td>
                      <td>{meeting.time}</td>
                      <td>
                        <span
                          style={{
                            fontSize: "1rem",
                            padding: "0.5em",
                            borderRadius: "1rem",
                          }}
                          className={`badge ${
                            meeting.level === "Team"
                              ? "bg-primary"
                              : meeting.level === "Department"
                              ? "bg-success"
                              : "bg-secondary"
                          }`}
                        >
                          {meeting.level}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEditClick(meeting)}
                        >
                          <CiEdit />
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteClick(meeting)}
                        >
                          <CiTrash />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MeetingList;
