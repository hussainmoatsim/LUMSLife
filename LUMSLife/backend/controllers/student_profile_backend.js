
const express = require('express');
const app = express();
const mysql = require('mysql2');
const connection = require('./networkConnection');
const { db } = require("../config/db_create");
const sha1 = require('sha1');


// Define routes for the different API endpoints
app.get('/api/profile/edit', function(req, res) {
  // Handle the request to edit student information
  const sql = 'UPDATE students SET name = ?, email = ?, password_hash = ? WHERE User_id = ?';
  const hashedPassword = sha1(req.body.password);
  const values = [req.body.name, req.body.email, hashedPassword, req.body.id];
  db.query(sql, values, function(err, result) {
    if (err) {
      throw err;
    }
    res.send('Student information updated successfully');
  });
});

app.get('/api/profile/cv-about-me', function(req, res) {
  // Handle the request to retrieve the student's CV and About Me content
  const sql = 'SELECT cv, about_me FROM Student WHERE User_id = ?';
  const values = [req.query.id];
  db.query(sql, values, function(err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.get('/api/profile/my-societies', function(req, res) {
  // Handle the request to retrieve the student's society information
  const sql = 'SELECT society_name, position FROM society_membership WHERE User_id = ?';
  const values = [req.query.id];
  db.query(sql, values, function(err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.get('/api/profile/my-applications', function(req, res) {
  // Handle the request to retrieve the student's society application information
  const sql = 'SELECT society_name, position FROM society_membership WHERE User_id = ? and joined = false'; //use joined = false to get applications from society_membership
  const values = [req.query.id];
  db.query(sql, values, function(err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

module.exports = app;
=======
const express = require('express');
const app = express();
const mysql = require('mysql');
const connection = require('./networkConnection');
const { db } = require("../config/db_create");
const sha1 = require('sha1');


// Define routes for the different API endpoints
app.get('/api/profile/edit', function(req, res) {
  // Handle the request to edit student information
  const sql = 'UPDATE students SET name = ?, email = ?, password_hash = ? WHERE User_id = ?';
  const hashedPassword = sha1(req.body.password);
  const values = [req.body.name, req.body.email, hashedPassword, req.body.id];
  db.query(sql, values, function(err, result) {
    if (err) {
      throw err;
    }
    res.send('Student information updated successfully');
  });
});

app.get('/api/profile/cv-about-me', function(req, res) {
  // Handle the request to retrieve the student's CV and About Me content
  const sql = 'SELECT cv, about_me FROM Student WHERE User_id = ?';
  const values = [req.query.id];
  db.query(sql, values, function(err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.get('/api/profile/my-societies', function(req, res) {
  // Handle the request to retrieve the student's society information
  const sql = 'SELECT society_name, position FROM society_membership WHERE User_id = ?';
  const values = [req.query.id];
  db.query(sql, values, function(err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.get('/api/profile/my-applications', function(req, res) {
  // Handle the request to retrieve the student's society application information
  const sql = 'SELECT society_name, position, status FROM society_applications WHERE student_id = ?';
  const values = [req.query.id];
  db.query(sql, values, function(err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

module.exports = app;

