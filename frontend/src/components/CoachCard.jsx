import React from "react";

const CoachCard = ({ coach, onDelete }) => {
  return (
    <div className="card">
      <h3>Coach ID: {coach.Coach_ID}</h3>
      <p><strong>Train ID:</strong> {coach.Train_ID}</p>
      <p><strong>Coach Type:</strong> {coach.Coach_Type}</p>
      <p><strong>Total Seats:</strong> {coach.Total_Seats}</p>
      <button className="delete-btn" onClick={() => onDelete(coach.Coach_ID)}>Delete</button>
    </div>
  );
};

export default CoachCard;
