import React, { useState } from "react";
import axios from "../utils/api";

const CoachForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    Train_ID: "",
    Coach_Type: "",
    Total_Seats: ""
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("/coaches", form);
      onAdd(res.data);
      setForm({ Train_ID: "", Coach_Type: "", Total_Seats: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Coach</h2>
      <input type="number" name="Train_ID" placeholder="Train ID" value={form.Train_ID} onChange={handleChange} required />
      <input type="text" name="Coach_Type" placeholder="Coach Type" value={form.Coach_Type} onChange={handleChange} required />
      <input type="number" name="Total_Seats" placeholder="Total Seats" value={form.Total_Seats} onChange={handleChange} required />
      <button type="submit">Add Coach</button>
    </form>
  );
};

export default CoachForm;
