import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CiEdit, CiTrash } from "react-icons/ci";
import { useForm } from "react-hook-form";

const MeetingList = ({ meetings, editMeeting }) => {
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
    console.log("Editing passed to handleEditClick:", meeting);
    setEditingId(meeting.id);
  };

  const handleSave = (data) => {
    editMeeting(editingId, data);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

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
              <tr key={meeting.id || index}>
                <td>{index + 1}</td>
                {editingId === meeting.id ? (
                  <>
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
                    <td>{meeting.title}</td>
                    <td>{meeting.date}</td>
                    <td>{meeting.time}</td>
                    <td>{meeting.level}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEditClick(meeting)}
                      >
                        <CiEdit />
                      </button>
                      <button className="btn btn-danger btn-sm">
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
  );
};

export default MeetingList;
