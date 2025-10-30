import express from "express";
import { db } from "../db.js";

const router = express.Router();

// Get all payments
router.get("/", (req, res) => {
  db.query("SELECT * FROM Payment", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Add payment
router.post("/", (req, res) => {
  const { Reservation_ID, Amount, Payment_Mode, Transaction_ID, Bank_Name } = req.body;
  const query = "INSERT INTO Payment (Reservation_ID, Amount, Payment_Mode, Transaction_ID, Bank_Name) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [Reservation_ID, Amount, Payment_Mode, Transaction_ID, Bank_Name], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ ...req.body, Payment_ID: result.insertId });
  });
});

// Delete payment
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM Payment WHERE Payment_ID = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Payment deleted" });
  });
});

export default router;
