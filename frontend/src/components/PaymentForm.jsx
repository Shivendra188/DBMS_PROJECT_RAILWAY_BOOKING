import React, { useState } from "react";
import axios from "../utils/api";

const PaymentForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    Reservation_ID: "",
    Amount: "",
    Payment_Mode: "",
    Transaction_ID: "",
    Bank_Name: ""
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("/payments", form);
      onAdd(res.data);
      setForm({ Reservation_ID: "", Amount: "", Payment_Mode: "", Transaction_ID: "", Bank_Name: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Payment</h2>
      <input type="number" name="Reservation_ID" placeholder="Reservation ID" value={form.Reservation_ID} onChange={handleChange} required />
      <input type="number" name="Amount" placeholder="Amount" value={form.Amount} onChange={handleChange} required />
      <input type="text" name="Payment_Mode" placeholder="Payment Mode" value={form.Payment_Mode} onChange={handleChange} required />
      <input type="text" name="Transaction_ID" placeholder="Transaction ID" value={form.Transaction_ID} onChange={handleChange} required />
      <input type="text" name="Bank_Name" placeholder="Bank Name" value={form.Bank_Name} onChange={handleChange} required />
      <button type="submit">Add Payment</button>
    </form>
  );
};

export default PaymentForm;
