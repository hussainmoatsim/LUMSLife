const express = require('express');
const router = express.Router();
const { db } = require("../config/db_create");

router.get('/api/event/info', function(req, res) {
  const sql = 'SELECT name, description, date FROM Events WHERE events_id = ?'; //get event info
  const values = [req.query.event_id];
  db.query(sql, values, function(err, result) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error retrieving event information" });
    }
    res.send(result);
  });
});

router.get('/api/event/attendance', function(req, res) {
  const sql = 'SELECT u.name, u.email FROM Event_attendance ea JOIN User u ON ea.user_id = u.User_id WHERE ea.event_id = ?'; //get all users attending event
  const values = [req.query.event_id];
  db.query(sql, values, function(err, result) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error retrieving event attendance" });
    }
    res.send(result);
  });
});

router.post('/api/event/create', function(req, res) {
  const { name, description, date, user_id } = req.body;
  const sql = 'INSERT INTO Events (name, description, date, user_id) VALUES (?, ?, ?, ?)';
  const values = [name, description, date, user_id];

  db.query(sql, values, function(err, result) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error creating event" });
    }
    res.status(201).json({ message: "Event created", eventId: result.insertId });
  });
});

router.post('/api/event/attend', function(req, res) {
  const { event_id, user_id } = req.body;
  const sql = 'INSERT INTO Event_attendance (event_id, user_id) VALUES (?, ?)';
  const values = [event_id, user_id];

  db.query(sql, values, function(err, result) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error attending event" });
    }
    res.status(201).json({ message: "Event attended" });
  });
});


module.exports = router;
