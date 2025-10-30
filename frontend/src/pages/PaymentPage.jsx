import React, { useState, useEffect } from "react";
import axios from "../utils/api";
import PaymentCard from "../components/PaymentCard";
import PaymentForm from "../components/PaymentForm";

const PaymentPage = () => {
  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    try {
      const res = await axios.get("/payments");
      setPayments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deletePayment = async id => {
    try {
      await axios.delete(`/payments/${id}`);
      setPayments(payments.filter(p => p.Payment_ID !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchPayments(); }, []);

  return (
    <div className="container">
      {/* <h1>Payments</h1> */}
      <PaymentForm onAdd={p => setPayments([...payments, { ...p, Payment_ID: Date.now() }])} />
      {payments.map(p => (
        <PaymentCard key={p.Payment_ID} payment={p} onDelete={deletePayment} />
      ))}
    </div>
  );
};

export default PaymentPage;
