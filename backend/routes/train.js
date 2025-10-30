import express from "express";
import { db } from "../db.js";

const router = express.Router();

// Get all trains
router.get("/", (req, res) => {
  db.query("SELECT * FROM Train", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Add new train
router.post("/", (req, res) => {
  const { Train_Name, Source, Destination, Total_Coaches } = req.body;
  const query = "INSERT INTO Train (Train_Name, Source, Destination, Total_Coaches) VALUES (?, ?, ?, ?)";
  db.query(query, [Train_Name, Source, Destination, Total_Coaches], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ ...req.body, Train_ID: result.insertId });
  });
});

// Delete train
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM Train WHERE Train_ID = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Train deleted" });
  });
});

export default router;
