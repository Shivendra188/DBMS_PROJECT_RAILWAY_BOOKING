import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BookingForm.css";

const BookingForm = () => {
  const [form, setForm] = useState({
    Passenger_ID: "",
    Train_ID: "",
    Journey_Date: "",
    Class: "Sleeper",
  });

  const [route, setRoute] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // 🔹 Fetch route when Train_ID changes
  useEffect(() => {
    if (form.Train_ID) {
      axios
        .get(`http://localhost:5000/api/train/${form.Train_ID}/route`)
        .then((res) => setRoute(res.data))
        .catch((err) => console.error(err));
    }
  }, [form.Train_ID]);

  // 🔹 Load all bookings
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Handle form changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Add or Update booking
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/bookings/${editingId}`, form);
        alert("Booking updated successfully ✅");
      } else {
        await axios.post("http://localhost:5000/api/book", form);
        alert("Booking added successfully ✅");
      }
      setForm({
        Passenger_ID: "",
        Train_ID: "",
        Journey_Date: "",
        Class: "Sleeper",
      });
      setEditingId(null);
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Edit booking
  const handleEdit = (booking) => {
    setForm({
      Passenger_ID: booking.Passenger_ID,
      Train_ID: booking.Train_ID,
      Journey_Date: booking.Journey_Date,
      Class: booking.Class,
    });
    setEditingId(booking.Reservation_ID);
  };

  // 🔹 Delete booking
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`);
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="booking-container">
      <h2 className="first-ll">🚆 Railway Ticket Reservation</h2>

      <form onSubmit={handleSubmit} className="booking-form">
        <input
          type="text"
          name="Passenger_ID"
          value={form.Passenger_ID}
          placeholder="Passenger ID"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Train_ID"
          value={form.Train_ID}
          placeholder="Train ID"
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="Journey_Date"
          value={form.Journey_Date}
          onChange={handleChange}
          required
        />
        <select name="Class" value={form.Class} onChange={handleChange}>
          <option>Sleeper</option>
          <option>3AC</option>
          <option>2AC</option>
          <option>1AC</option>
        </select>

        <button type="submit" className="add-btn">
          {editingId ? "Update Booking" : "Add Booking"}
        </button>
      </form>

      {/* === Route Timeline === */}
      {route.length > 0 && (
        <div className="route-timeline">
          <h3>🧭 Train Route</h3>
          <div className="horizontal-timeline">
            {route.map((station, index) => (
              <div key={index} className="station">
                <div className="station-dot"></div>
                <div className="station-info">
                  <h4>{station.Station_Name}</h4>
                  <p>Arr: {station.Arrival_Time}</p>
                  <p>Dep: {station.Departure_Time}</p>
                </div>
                {index !== route.length - 1 && <div className="station-line"></div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* === Booking List === */}
      <div className="booking-list">
        <h3>📋 Booked Tickets</h3>
        <table className="Bookings-ll">
          <thead>
            <tr>
              <th>Reservation ID</th>
              <th>Passenger ID</th>
              <th>Train ID</th>
              <th>Date</th>
              <th>Class</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.Reservation_ID}>
                <td>{b.Reservation_ID}</td>
                <td>{b.Passenger_ID}</td>
                <td>{b.Train_ID}</td>
                <td>{b.Journey_Date}</td>
                <td>{b.Class}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(b)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(b.Reservation_ID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingForm;
