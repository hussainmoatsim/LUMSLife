const express = require('express');
const app = express();
const mysql = require('mysql2');
const { db } = require("../config/db_create");

app.get('/api/event/info', function(req, res) {
  // Handle the request to retrieve event information
  const sql = 'SELECT name, description,location, date FROM Events WHERE events_id = ?';
  const values = [req.query.event_id];
  db.query(sql, values, function(err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.get('/api/event/attendance', function(req, res) {
    
  const sql = 'SELECT u.name, u.email FROM Event_attendance ea JOIN User u ON ea.user_id = u.User_id WHERE ea.event_id = ?';
  const values = [req.query.event_id];
  db.query(sql, values, function(err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

module.exports = app;
