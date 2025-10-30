import React from "react";

const TrainCard = ({ train, onDelete }) => {
  return (
    <div className="card">
      <h3>{train.Train_Name}</h3>
      <p><strong>Source:</strong> {train.Source}</p>
      <p><strong>Destination:</strong> {train.Destination}</p>
      <p><strong>Total Coaches:</strong> {train.Total_Coaches}</p>
      <button className="delete-btn" onClick={() => onDelete(train.Train_ID)}>
        Delete
      </button>
    </div>
  );
};

export default TrainCard;
