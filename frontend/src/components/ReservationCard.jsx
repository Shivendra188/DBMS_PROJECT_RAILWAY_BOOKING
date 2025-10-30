import React from "react";

const ReservationCard = ({ reservation, onDelete }) => {
  return (
    <div className="card">
      <h3>Reservation ID: {reservation.Reservation_ID}</h3>
      <p><strong>Passenger ID:</strong> {reservation.Passenger_ID}</p>
      <p><strong>Train ID:</strong> {reservation.Train_ID}</p>
      <p><strong>Journey Date:</strong> {reservation.Journey_Date}</p>
      <p><strong>Seat Number:</strong> {reservation.Seat_Number}</p>
      <p><strong>Class:</strong> {reservation.Class}</p>
      <p><strong>Status:</strong> {reservation.Status}</p>
      <button className="delete-btn" onClick={() => onDelete(reservation.Reservation_ID)}>Delete</button>
    </div>
  );
};

export default ReservationCard;
