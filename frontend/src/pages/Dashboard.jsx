import React, { useEffect, useState } from "react";
import api from "../utils/api";
import BookingForm from "../components/BookingForm";



export default function Dashboard() {
  const [counts, setCounts] = useState({
    passengers: 0,
    trains: 0,
    reservations: 0,
    coaches: 0,
  });

  const fetchCounts = async () => {
    const passengers = await api.get("/passengers");
    const trains = await api.get("/trains");
    const reservations = await api.get("/reservations");
    const coaches = await api.get("/coaches");
    setCounts({
      passengers: passengers.data.length,
      trains: trains.data.length,
      reservations: reservations.data.length,
      coaches: coaches.data.length,
    });
  };

  // useEffect(() => {
  //   fetchCounts();
  // }, []);
  useEffect(() => {
  const fetchCounts = async () => {
    const res = await axios.get("http://localhost:5000/api/coaches");
    console.log(res.data);
  };
  fetchCounts();
}, []);

  return (
    <div>
       <h2 className="h2p">Welcome to Railway Dashboard</h2>
      <h2>Dashboard</h2>
      <div className="card">Total Passengers: {counts.passengers}</div>
      <div className="card">Total Trains: {counts.trains}</div>
      <div className="card">Total Reservations: {counts.reservations}</div>
      <div className="card">Total Coaches: {counts.coaches}</div>
      <div>
        <BookingForm/>
      </div>
      
    </div>
  );
}
