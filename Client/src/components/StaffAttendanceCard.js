import React, { useState, useEffect } from "react";
import axios from "axios";

const StaffAttendanceCard = ({ apiPath = "http://localhost:5000/api/attendance", title, description, color }) => {
  const [view, setView] = useState("default");
  const [staffList, setStaffList] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [newStaff, setNewStaff] = useState({
    staffId: "",
    staffName: "",
    email: "",
    contact: "",
  });
  const [attendanceRecord, setAttendanceRecord] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  // Fetch all staff
  const fetchStaff = async () => {
    try {
      const response = await axios.get(`${apiPath}/`);
      const uniqueStaff = Array.from(new Map(response.data.map(staff => [staff.staffId, staff])).values());
      setStaffList(uniqueStaff);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  // Fetch attendance data by date
  const fetchAttendance = async (date) => {
    try {
      const response = await axios.get(`${apiPath}/?date=${date}`);
      if (response.data && response.data.length > 0) {
        setAttendance(response.data);
      } else {
        setAttendance([]); // Set empty array if no data
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  // Add new staff
  const addStaff = async () => {
    const { staffId, staffName } = newStaff;

    if (!staffId || !staffName) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await axios.post(`${apiPath}/staff`, newStaff);
      if (response.status === 201) {
        alert("Staff added successfully");
        setNewStaff({ staffId: "", staffName: "" });
        fetchStaff();
      } else {
        alert(response.data.message || "Error adding staff");
      }
    } catch (error) {
      console.error("Error adding staff:", error);
      alert("Error adding staff. Please try again.");
    }
  };

  // Save attendance
  const saveAttendance = async () => {
    try {
      const uniqueAttendance = new Map();

      Object.entries(attendanceRecord).forEach(([staffId, status]) => {
        const staff = staffList.find(staff => staff.staffId === staffId);
        if (staff) {
          uniqueAttendance.set(staffId, {
            staffId,
            staffName: staff.staffName,
            status,
            date: selectedDate,
          });
        }
      });

      const formattedAttendance = Array.from(uniqueAttendance.values());

      if (formattedAttendance.length > 0) {
        await axios.post(`${apiPath}/attendance/mark`, formattedAttendance);
        alert("Attendance saved successfully!");

        // Reset attendance record after saving
        setAttendanceRecord({});

        // Fetch fresh attendance data
        fetchAttendance(selectedDate);
      } else {
        alert("No valid attendance records to save.");
      }
    } catch (error) {
      console.error("Error saving attendance:", error);
      alert("Already Marked for Today.");
    }
  };

  // Handle attendance status change
  const handleAttendanceChange = (staffId, status) => {
    setAttendanceRecord(prevState => ({
      ...prevState,
      [staffId]: status,
    }));
  };

  // Handle view changes and fetch data accordingly
  useEffect(() => {
    if (view === "mark") {
      fetchStaff();  // Fetch staff immediately when opening "Mark Attendance"
    }
    if (view === "fetch") {
      fetchAttendance(selectedDate);
    }
  }, [view, selectedDate]);

  return (
    <div className={`card border-${color} mb-4 shadow-lg`}>
             <div style={{ marginTop: '25px' }}></div>

      <div style={{ marginTop: '70px' }}></div>

      <div className={`card-header bg-${color} text-white`}>
        <h4>{title}</h4>
      </div>
      <div className="card-body">
        <p>{description}</p>

        {/* Action Buttons */}
        <div className="mb-3 d-flex justify-content-between">
          <button className="btn btn-primary btn-lg" onClick={() => setView("add")}>
            Add Staff
          </button>
          <button className="btn btn-secondary btn-lg" onClick={() => setView("mark")}>
            Mark Attendance
          </button>
          <button className="btn btn-success btn-lg" onClick={() => setView("fetch")}>
            Fetch Data
          </button>
        </div>

        {/* Add Staff View */}
        {view === "add" && (
          <div>
            <h5>Add Staff</h5>
            <div className="form-group">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Enter staff ID"
                value={newStaff.staffId}
                onChange={(e) => setNewStaff({ ...newStaff, staffId: e.target.value })}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Enter staff name"
                value={newStaff.staffName}
                onChange={(e) => setNewStaff({ ...newStaff, staffName: e.target.value })}
              />
            </div>
            <button className="btn btn-success btn-lg" onClick={addStaff}>
              Add Staff
            </button>
          </div>
        )}

        {/* Mark Attendance View */}
        {view === "mark" && (
          <div>
            <h5>Mark Attendance</h5>
            <form>
              {staffList.map((staff) => (
                <div key={staff.staffId} className="mb-3 d-flex justify-content-between">
                  <span>{staff.staffName}</span>
                  <div>
                    <label className="mr-2">
                      <input
                        type="radio"
                        name={`attendance-${staff.staffId}`}
                        value="Present"
                        checked={attendanceRecord[staff.staffId] === "Present"}
                        onChange={() => handleAttendanceChange(staff.staffId, "Present")}
                      />
                      Present
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`attendance-${staff.staffId}`}
                        value="Absent"
                        checked={attendanceRecord[staff.staffId] === "Absent"}
                        onChange={() => handleAttendanceChange(staff.staffId, "Absent")}
                      />
                      Absent
                    </label>
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="btn btn-warning btn-lg mt-3"
                onClick={saveAttendance}
              >
                Save Attendance
              </button>
            </form>
          </div>
        )}

        {/* Fetch Data View */}
        {view === "fetch" && (
          <div>
            <h5>Fetch Attendance Records</h5>
            <div className="form-group">
              <input
                type="date"
                className="form-control mb-3"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record) => (
                  <tr key={record._id}>
                    <td>{record.staffName}</td>
                    <td>{new Date(record.date).toLocaleDateString()}</td>
                    <td>{record.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffAttendanceCard;
