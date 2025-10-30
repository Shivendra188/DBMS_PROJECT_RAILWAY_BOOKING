import React from "react";

const PassengerCard = ({ passenger, onDelete }) => {
  return (
    <div className="card">
      <h3>{passenger.First_Name} {passenger.Last_Name}</h3>
      <p><strong>Email:</strong> {passenger.Email}</p>
      <p><strong>Gender:</strong> {passenger.Gender}</p>
      <p><strong>Age:</strong> {passenger.Age}</p>
      <p><strong>Address:</strong> {passenger.Street}, {passenger.City}, {passenger.State} - {passenger.Pincode}</p>
      <button className="delete-btn" onClick={() => onDelete(passenger.Passenger_ID)}>
        Delete
      </button>
    </div>
  );
};

export default PassengerCard;
