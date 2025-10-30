import React, { useState, useEffect } from "react";
import axios from "../utils/api";
import TrainCard from "../components/TrainCard";
import TrainForm from "../components/TrainForm";

const TrainPage = () => {
  const [trains, setTrains] = useState([]);

  const fetchTrains = async () => {
    try {
      const res = await axios.get("/trains");
      setTrains(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTrain = async (id) => {
    try {
      await axios.delete(`/trains/${id}`);
      setTrains(trains.filter(t => t.Train_ID !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchTrains(); }, []);

  return (
    <div className="container">
      {/* <h1>Trains</h1> */}
      <TrainForm onAdd={t => setTrains([...trains, { ...t, Train_ID: Date.now() }])} />
      {trains.map(t => (
        <TrainCard key={t.Train_ID} train={t} onDelete={deleteTrain} />
      ))}
    </div>
  );
};

export default TrainPage;
