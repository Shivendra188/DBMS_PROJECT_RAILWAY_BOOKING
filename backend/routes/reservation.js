import express from "express";
import { db } from "../db.js";

const router = express.Router();

// Get all reservations
router.get("/", (req, res) => {
  db.query("SELECT * FROM Reservation", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Add reservation
router.post("/", (req, res) => {
  const { Passenger_ID, Train_ID, Journey_Date, Booking_Date, Seat_Number, Class, Status } = req.body;
  const query = "INSERT INTO Reservation (Passenger_ID, Train_ID, Journey_Date, Booking_Date, Seat_Number, Class, Status) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(query, [Passenger_ID, Train_ID, Journey_Date, Booking_Date, Seat_Number, Class, Status], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ ...req.body, Reservation_ID: result.insertId });
  });
});

// Delete reservation
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM Reservation WHERE Reservation_ID = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Reservation deleted" });
  });
});

export default router;
