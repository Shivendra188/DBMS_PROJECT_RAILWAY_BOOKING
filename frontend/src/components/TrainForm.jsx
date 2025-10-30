import React, { useState } from "react";
import axios from "../utils/api";

const TrainForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    Train_Name: "",
    Source: "",
    Destination: "",
    Total_Coaches: ""
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("/trains", form);
      onAdd(res.data);
      setForm({ Train_Name: "", Source: "", Destination: "", Total_Coaches: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Train</h2>
      <input type="text" name="Train_Name" placeholder="Train Name" value={form.Train_Name} onChange={handleChange} required />
      <input type="text" name="Source" placeholder="Source" value={form.Source} onChange={handleChange} required />
      <input type="text" name="Destination" placeholder="Destination" value={form.Destination} onChange={handleChange} required />
      <input type="number" name="Total_Coaches" placeholder="Total Coaches" value={form.Total_Coaches} onChange={handleChange} required />
      <button type="submit">Add Train</button>
    </form>
  );
};

export default TrainForm;
