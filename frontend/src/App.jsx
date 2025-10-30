import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PassengerPage from "./pages/PassengerPage";
import TrainPage from "./pages/TrainPage";
import ReservationPage from "./pages/ReservationPage";
import PaymentPage from "./pages/PaymentPage";
import "./App.css";




export default function App() {
  return (
    
    <Router>
      <div className="app">
        <nav className="navbar">
          <h2>🚆 Railway Reservation System</h2>
          <div className="nav-links">
            <Link to="/">Dashboard</Link>
            <Link to="/passengers">Passengers</Link>
            <Link to="/trains">Trains</Link>
            <Link to="/reservations">Reservations</Link>
            <Link to="/payments">Payments</Link>
          </div>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/passengers" element={<PassengerPage />} />
            <Route path="/trains" element={<TrainPage />} />
            <Route path="/reservations" element={<ReservationPage />} />
            <Route path="/payments" element={<PaymentPage />} />
          </Routes>
        </div>
       
      </div>
    </Router>
  );
}
// cd backend
// npm install express mysql2 cors body-parser
// node server.js


// cd frontend
// npm install axios react-router-dom
// npm run dev
