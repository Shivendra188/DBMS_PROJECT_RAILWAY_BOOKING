// 🚀 Railway Reservation Backend Server
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Connect to MySQL Database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",                // your MySQL username
  password: "shivendra@2005",  // your MySQL password
  database: "Railway_Reservation_System",
});

db.connect(err => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL Database!");
  }
});
const result = await db.promise().query("DELETE FROM passengers WHERE id = ?", [id]);
console.log(result);


// ===================================================================
// 🚉 PASSENGER ROUTES
// ===================================================================

// 1️⃣ Get all passengers
app.get("/api/passengers", (req, res) => {
  db.query("SELECT * FROM Passenger", (err, result) => {
    if (err) res.status(500).send(err);
    else res.send(result);
  });
});

// 2️⃣ Add new passenger
app.post("/api/passengers", (req, res) => {
  const { Passenger_ID, First_Name, Last_Name, Email, Gender, Age, City } = req.body;
  const sql = `
    INSERT INTO Passenger (Passenger_ID, First_Name, Last_Name, Email, Gender, Age, City)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [Passenger_ID, First_Name, Last_Name, Email, Gender, Age, City], (err, result) => {
    if (err) res.status(500).send(err);
    else res.send({ message: "✅ Passenger added successfully!" });
  });
});

app.delete("/api/passengers/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const [result] = await db.promise().query("DELETE FROM passengers WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Passenger not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


// app.delete("/api/passengers/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const [result] = await db.promise().query("DELETE FROM passengers WHERE id=?", [id]);
//     res.json({ message: "Deleted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// ===================================================================
// 🚆 TRAIN ROUTES
// ===================================================================

// 4️⃣ Get all trains
app.get("/api/trains", (req, res) => {
  db.query("SELECT * FROM Train", (err, result) => {
    if (err) res.status(500).send(err);
    else res.send(result);
  });
});

// 5️⃣ Get route info for a train
app.get("/api/train/:id/route", (req, res) => {
  const trainId = req.params.id;
  const sql = `SELECT * FROM Train_Operation_Days WHERE Train_ID = ?`;
  db.query(sql, [trainId], (err, result) => {
    if (err) res.status(500).send(err);
    else res.send(result);
  });
});


// ===================================================================
// 🧾 RESERVATION & BOOKING ROUTES
// ===================================================================

// 6️⃣ Create a reservation (booking)
app.post("/api/reservation", (req, res) => {
  const { Passenger_ID, Train_ID, Journey_Date, Class } = req.body;
  const Seat_Number = Math.floor(Math.random() * 100) + 1;
  const PNR = "PNR" + Date.now();

  const sql = `
    INSERT INTO Reservation (Reservation_ID, Passenger_ID, Train_ID, Journey_Date, Booking_Date, Seat_Number, Class, Status)
    VALUES (?, ?, ?, ?, CURDATE(), ?, ?, 'CONFIRMED')
  `;

  db.query(sql, [Date.now(), Passenger_ID, Train_ID, Journey_Date, Seat_Number, Class], (err) => {
    if (err) res.status(500).send(err);
    else res.send({ message: "✅ Reservation booked successfully!", PNR, Seat_Number });
  });
});

// 7️⃣ Get all reservations
app.get("/api/reservations", (req, res) => {
  db.query("SELECT * FROM Reservation", (err, result) => {
    if (err) res.status(500).send(err);
    else res.send(result);
  });
});

// 8️⃣ Alias route: GET /api/bookings (same data as reservations)
app.get("/api/bookings", (req, res) => {
  db.query("SELECT * FROM Reservation", (err, result) => {
    if (err) res.status(500).send(err);
    else res.send(result);
  });
});


// ===================================================================
// ⚙️ START SERVER
// ===================================================================

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
