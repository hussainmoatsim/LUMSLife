const express = require("express");
const app = express();
const mysql = require("mysql");
const connection = require("./networkConnection");
const { db } = require("../config/db_create");
const sha1 = require("sha1");

// Define routes for the different API endpoints
app.put("/api/profile/edit", function (req, res) {
  // Handle the request to edit student information
  const sql =
    "UPDATE Society SET name = ?, email = ?, password_hash = ? WHERE Society_id = ?";
  const hashedPassword = sha1(req.body.password);
  const values = [req.body.name, req.body.email, hashedPassword, req.body.id];
  db.query(sql, values, function (err, result) {
    if (err) {
      throw err;
    }
    res.send("Society information updated successfully");
  });
});

app.get("/api/profile/society-members", function (req, res) {
  // Handle the request to retrieve the names of society members
  // const sql = 'SELECT name FROM User WHERE User_id = (SELECT User_id FROM Society_membership WHERE member_id = (SELECT member_id FROM society_membership WHERE society_id = ?))';
  const sql =
    "SELECT U.name FROM User U JOIN Society_member SM ON U.User_id = SM.User_id JOIN Society_membership SM2 ON SM.member_id = SM2.member_id WHERE SM2.joined = true AND SM2.Society_id = <society_id>;";
  const values = [req.query.id];
  db.query(sql, values, function (err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.get("/api/profile/posts", function (req, res) {
  // Handle the request to retrieve the society's posts
  const sql =
    "SELECT P.* FROM Society S JOIN Posts P ON S.posts_id = P.posts_id WHERE S.Society_id = <society_id>;";
  const values = [req.query.id];
  db.query(sql, values, function (err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.get("/api/profile/view-applicants", function (req, res) {
  // Handle the request to retrieve the name, cv, and about_me of students who have applied to the society
  //const sql = 'SELECT cv, about_me FROM studentTable WHERE User_id = (SELECT member_id FROM societyMembershipTable WHERE joined = false)';
  const sql =
    "SELECT U.name, S.cv, S.about_me FROM User U JOIN Student S ON U.User_id = S.User_id JOIN Society_member SM ON U.User_id = SM.User_id JOIN Society_membership SM2 ON SM.member_id = SM2.member_id WHERE SM2.joined = false";
  const values = [req.query.id];
  db.query(sql, values, function (err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.put("/api/profile/edit-about", function (req, res) {
  const sql = "UPDATE Society SET about_me = ? WHERE Society_id = ?";
  const values = [req.body.about_me, req.body.id];
  db.query(sql, values, function (err, result) {
    if (err) {
      throw err;
    }
    res.send("About Me updated successfully");
  });
});

app.get("/api/profile/posts/:id", function (req, res) {
  const societyId = req.params.id;
  const sql =
    "SELECT P.* FROM Society S JOIN Posts P ON S.posts_id = P.posts_id WHERE S.Society_id = ?;";
  const values = [societyId];

  db.query(sql, values, function (err, result) {
    if (err) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching posts." });
      throw err;
    }
    res.status(200).json(result);
  });
});

module.exports = app;
