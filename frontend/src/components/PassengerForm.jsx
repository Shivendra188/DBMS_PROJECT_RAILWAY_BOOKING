import React, { useState } from "react";
import axios from "../utils/api";

const PassengerForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    First_Name: "",
    Last_Name: "",
    Email: "",
    Gender: "",
    Age: "",
    Street: "",
    City: "",
    State: "",
    Pincode: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("/passengers", form);
      onAdd(res.data);
      setForm({
        First_Name: "",
        Last_Name: "",
        Email: "",
        Gender: "",
        Age: "",
        Street: "",
        City: "",
        State: "",
        Pincode: ""
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="h2p">
      <h2>Add Passenger</h2>
      <input type="text" name="First_Name" placeholder="First Name" value={form.First_Name} onChange={handleChange} required />
      <input type="text" name="Last_Name" placeholder="Last Name" value={form.Last_Name} onChange={handleChange} required />
      <input type="email" name="Email" placeholder="Email" value={form.Email} onChange={handleChange} required />
      <input type="text" name="Gender" placeholder="Gender" value={form.Gender} onChange={handleChange} />
      <input type="number" name="Age" placeholder="Age" value={form.Age} onChange={handleChange} />
      <input type="text" name="Street" placeholder="Street" value={form.Street} onChange={handleChange} />
      <input type="text" name="City" placeholder="City" value={form.City} onChange={handleChange} />
      <input type="text" name="State" placeholder="State" value={form.State} onChange={handleChange} />
      <input type="text" name="Pincode" placeholder="Pincode" value={form.Pincode} onChange={handleChange} />
      <button type="submit">Add Passenger</button>
    </form>
  );
};

export default PassengerForm;
