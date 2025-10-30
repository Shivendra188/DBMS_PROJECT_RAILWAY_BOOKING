const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // your MySQL username
  password: "shivendra@2005", // your MySQL password
  database: "railway_reservation_system"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL Database");
  }
});

module.exports = db;
