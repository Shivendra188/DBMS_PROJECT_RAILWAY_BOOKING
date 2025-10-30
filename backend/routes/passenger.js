const express = require("express");
const db = require("../db.js"); // CommonJS require
const router = express.Router();

// Get all passengers
router.get("/", (req, res) => {
  db.query("SELECT * FROM Passenger", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// Add passenger
router.post("/", (req, res) => {
  const data = req.body;
  db.query("INSERT INTO Passenger SET ?", data, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Passenger added", id: result.insertId });
  });
});

// Delete passenger
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM Passenger WHERE Passenger_ID = ?", [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Passenger deleted" });
  });
});

module.exports = router;
