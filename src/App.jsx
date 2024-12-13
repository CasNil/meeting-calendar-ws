import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import MeetingList from "./Components/MeetingList";
import Dashboard from "./Components/Dashboard";
import axios from "axios";
import MeetingForm from "./Components/MeetingForm";
import { BrowserRouter as Router, Route, Routes } from "react-router";

const App = () => {
  const [meetingsData, setMeetingsData] = useState([]);
  const [reload, setReload] = useState(false);

  const apiEndpoint = "http://localhost:8080/api/meetings";

  useEffect(() => {
    const fetchAllMeetings = async () => {
      try {
        const response = await axios.get(apiEndpoint);
        if (response.status === 200) {
          setMeetingsData(response.data);
        } else {
          console.log("Unexpected response status: ", response.status);
        }
      } catch (error) {
        console.error("Error occured during the API call.");
      }
    };
    fetchAllMeetings();
  }, [reload]);

  const handleAddMeeting = () => {
    setReload(!reload);
  };

  const PageNotFound = () => {
    return (
      <div className="container text-center mt-5">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    );
  };

  return (
    <Router>
      <div className="d-flex flex-column vh-100">
        <Navbar />

        <div className="container-fluid my-4 flex-grow-1">
          <div className="row">
            <div className="col-md-2">
              <Dashboard />
            </div>

            <div className="col-md-10">
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <div
                        className="p-4 border mb-4"
                        style={{
                          borderRadius: "8px",
                        }}
                      >
                        <MeetingForm reloadMeetings={handleAddMeeting} />
                      </div>
                      <MeetingList
                        meetings={meetingsData}
                        apiEndpoint={apiEndpoint}
                        reload={reload}
                        setReload={setReload}
                      />
                    </>
                  }
                />
                <Route
                  path="schedule-meeting"
                  element={
                    <div
                      className="p-4 border"
                      style={{
                        borderRadius: "8px",
                      }}
                    >
                      <MeetingForm reloadMeetings={handleAddMeeting} />
                    </div>
                  }
                />
                <Route
                  path="manage-meetings"
                  element={
                    <MeetingList
                      meetings={meetingsData}
                      apiEndpoint={apiEndpoint}
                      reload={reload}
                      setReload={setReload}
                    />
                  }
                />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
