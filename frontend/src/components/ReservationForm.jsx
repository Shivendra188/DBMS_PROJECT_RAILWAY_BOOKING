import React, { useState } from "react";
import axios from "../utils/api";

const ReservationForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    Passenger_ID: "",
    Train_ID: "",
    Journey_Date: "",
    Booking_Date: "",
    Seat_Number: "",
    Class: "",
    Status: ""
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("/reservations", form);
      onAdd(res.data);
      setForm({
        Passenger_ID: "",
        Train_ID: "",
        Journey_Date: "",
        Booking_Date: "",
        Seat_Number: "",
        Class: "",
        Status: ""
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Reservation</h2>
      <input type="number" name="Passenger_ID" placeholder="Passenger ID" value={form.Passenger_ID} onChange={handleChange} required />
      <input type="number" name="Train_ID" placeholder="Train ID" value={form.Train_ID} onChange={handleChange} required />
      <input type="date" name="Journey_Date" placeholder="Journey Date" value={form.Journey_Date} onChange={handleChange} required />
      <input type="date" name="Booking_Date" placeholder="Booking Date" value={form.Booking_Date} onChange={handleChange} required />
      <input type="text" name="Seat_Number" placeholder="Seat Number" value={form.Seat_Number} onChange={handleChange} required />
      <input type="text" name="Class" placeholder="Class" value={form.Class} onChange={handleChange} required />
      <input type="text" name="Status" placeholder="Status" value={form.Status} onChange={handleChange} required />
      <button type="submit">Add Reservation</button>
    </form>
  );
};

export default ReservationForm;
