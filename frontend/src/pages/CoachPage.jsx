import React, { useState, useEffect } from "react";
import axios from "../utils/api";
import CoachCard from "../components/CoachCard";
import CoachForm from "../components/CoachForm";

const CoachPage = () => {
  const [coaches, setCoaches] = useState([]);

  const fetchCoaches = async () => {
    try {
      const res = await axios.get("/coaches");
      setCoaches(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCoach = async id => {
    try {
      await axios.delete(`/coaches/${id}`);
      setCoaches(coaches.filter(c => c.Coach_ID !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchCoaches(); }, []);

  return (
    <div className="container">
      {/* <h1>Coaches</h1> */}
      <CoachForm onAdd={c => setCoaches([...coaches, { ...c, Coach_ID: Date.now() }])} />
      {coaches.map(c => (
        <CoachCard key={c.Coach_ID} coach={c} onDelete={deleteCoach} />
      ))}
    </div>
  );
};

export default CoachPage;
