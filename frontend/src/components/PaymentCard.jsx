import React from "react";

const PaymentCard = ({ payment, onDelete }) => {
  return (
    <div className="card">
      <h3>Payment ID: {payment.Payment_ID}</h3>
      <p><strong>Reservation ID:</strong> {payment.Reservation_ID}</p>
      <p><strong>Amount:</strong> {payment.Amount}</p>
      <p><strong>Payment Mode:</strong> {payment.Payment_Mode}</p>
      <p><strong>Transaction ID:</strong> {payment.Transaction_ID}</p>
      <p><strong>Bank Name:</strong> {payment.Bank_Name}</p>
      <button className="delete-btn" onClick={() => onDelete(payment.Payment_ID)}>Delete</button>
    </div>
  );
};

export default PaymentCard;
