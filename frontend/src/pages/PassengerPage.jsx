import React, { useEffect, useState } from "react";
import api from "../utils/api";

import PassengerForm from "../components/PassengerForm";

<PassengerForm onAdd={p => setPassengers([...passengers, { ...p, Passenger_ID: Date.now() }])} />


export default function PassengerPage() {
  const [passengers, setPassengers] = useState([]);

  const fetchPassengers = async () => {
    const res = await api.get("/passengers");
    setPassengers(res.data);
  };

  const deletePassenger = async (id) => {
    await api.delete(`/passengers/${id}`);
    fetchPassengers();
  };

  useEffect(() => {
    fetchPassengers();
  }, []);

  return (
    <div className="">
      {/* <h2 className="h2p">Passengers</h2> */}
      <PassengerForm onAdd={fetchPassengers} />
      {passengers.map((p) => (
        <div key={p.Passenger_ID} className="card">
          <h3>{p.First_Name} {p.Last_Name}</h3>
          <p>Email: {p.Email}</p>
          <p>City: {p.City}</p>
          <button onClick={() => deletePassenger(p.Passenger_ID)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
