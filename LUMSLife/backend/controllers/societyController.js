const asyncHandler = require("express-async-handler");
const { db } = require("../config/db_create");

const create_post = asyncHandler(async (req, res) => {
  const {
    title,
    dateTime,
    eventCategory,
    eventDescription,
    eventLocation,
    user_id,
  } = req.body;

  const sql = `INSERT INTO Posts (title, date_time, category, description, location, user_id) 
             VALUES (?, ?, ?, ?, ?, ?)`;

  const values = [
    title,
    dateTime,
    eventCategory,
    eventDescription,
    eventLocation,
    user_id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Failed to create post" });
    }
    console.log(`Post with ID ${result.insertId} created`);
    return res.status(201).json({ message: "Post created" });
  });
});

const getEventInfo = asyncHandler((req, res) => {
  // Handle the request to retrieve event information
  const sql = "SELECT name, description, date FROM Events WHERE events_id = ?";
  const values = [req.query.event_id];
  db.query(sql, values, function (err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

const getEventAttendance = asyncHandler((req, res) => {
  const sql =
    "SELECT u.name, u.email FROM Event_attendance ea JOIN User u ON ea.user_id = u.User_id WHERE ea.event_id = ?";
  const values = [req.query.event_id];
  db.query(sql, values, function (err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});
module.exports = {
  create_post,
  getEventAttendance,
  getEventInfo,
};
