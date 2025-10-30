import express from "express";
import { db } from "../db.js";

const router = express.Router();

// Get all coaches
router.get("/", (req, res) => {
  db.query("SELECT * FROM Coach", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Add coach
router.post("/", (req, res) => {
  const { Train_ID, Coach_Type, Total_Seats } = req.body;
  const query = "INSERT INTO Coach (Train_ID, Coach_Type, Total_Seats) VALUES (?, ?, ?)";
  db.query(query, [Train_ID, Coach_Type, Total_Seats], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ ...req.body, Coach_ID: result.insertId });
  });
});

// Delete coach
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM Coach WHERE Coach_ID = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Coach deleted" });
  });
});

export default router;
