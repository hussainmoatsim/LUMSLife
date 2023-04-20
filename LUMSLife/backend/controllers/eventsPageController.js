const express = require("express");
const router = express.Router();
const { db } = require("../config/db_create");

const getEventInfo = async (req, res) => {
  const sql = `
    SELECT e.name, e.description, e.date, e.location, s.society_name AS society_name
    FROM Events e
    JOIN Society s ON e.society_id = s.society_id
    WHERE e.events_id = ?
  `;
  const values = [req.query.event_id];
  db.query(sql, values, function (err, result) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error retrieving event information" });
    }
    res.send(result);
  });
};

const getEventAttendance = async (req, res) => {
  const sql = "SELECT u.name, u.email FROM Event_attendance ea JOIN User u ON ea.user_id = u.User_id WHERE ea.event_id = ?"; //get all users attending event
  const values = [req.query.event_id];
  db.query(sql, values, function (err, result) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error retrieving event attendance" });
    }
    res.send(result);
  });
};

const createEvent = async (req, res) => {
  const { name, description, date, society_name, location } = req.body;

  
  const society_sql = `SELECT Society_id FROM Society WHERE society_name = ?`;
  const [society] = await db.promise().query(society_sql, [society_name]);
  const society_id = society[0].Society_id;
  
  const sql = "INSERT INTO Events (name, description, date, society_id, location) VALUES (?, ?, ?, ?, ?)";
  const values = [name, description, date, society_id, location];

  db.query(sql, values, function (err, result) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error creating event" });
    }
    res.status(201).json({ message: "Event created", eventId: result.insertId });
  });
};

const attendEvent = async (req, res) => {
  const { event_id, user_id } = req.body;
  const sql = "INSERT INTO Event_attendance (event_id, user_id) VALUES (?, ?)";
  const values = [event_id, user_id];

  db.query(sql, values, function (err, result) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error attending event" });
    }
    res.status(201).json({ message: "Event attended" });
  });
};



module.exports = {
  getEventInfo,
  getEventAttendance,
  createEvent,
  attendEvent,
};
