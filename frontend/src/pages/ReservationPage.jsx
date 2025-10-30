import React, { useState, useEffect } from "react";
import axios from "../utils/api";
import ReservationCard from "../components/ReservationCard";
import ReservationForm from "../components/ReservationForm";

const ReservationPage = () => {
  const [reservations, setReservations] = useState([]);

  const fetchReservations = async () => {
    try {
      const res = await axios.get("/reservations");
      setReservations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteReservation = async id => {
    try {
      await axios.delete(`/reservations/${id}`);
      setReservations(reservations.filter(r => r.Reservation_ID !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchReservations(); }, []);

  return (
    <div className="container">
      {/* <h1>Reservations</h1> */}
      <ReservationForm onAdd={r => setReservations([...reservations, { ...r, Reservation_ID: Date.now() }])} />
      {reservations.map(r => (
        <ReservationCard key={r.Reservation_ID} reservation={r} onDelete={deleteReservation} />
      ))}
    </div>
  );
};

export default ReservationPage;
