const asyncHandler = require("express-async-handler");
const { db } = require("../config/db_create");

const editInfo = asyncHandler((req, res) => {
  // Handle the request to edit student information
  const sql =
    "UPDATE students SET name = ?, email = ?, password_hash = ? WHERE User_id = ?";
  const hashedPassword = sha1(req.body.password);
  const values = [req.body.name, req.body.email, hashedPassword, req.body.id];
  db.query(sql, values, function (err, result) {
    if (err) {
      throw err;
    }
    res.send("Student information updated successfully");
  });
});

const cvAboutMe = asyncHandler((req, res) => {
  // Handle the request to retrieve the student's CV and About Me content
  const sql = "SELECT cv, about_me FROM Student WHERE User_id = ?";
  const values = [req.query.id];
  db.query(sql, values, function (err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

const getMySocities = asyncHandler((req, res) => {
  // Handle the request to retrieve the student's society information
  const sql =
    "SELECT society_name, position FROM society_membership WHERE member_id = ?";
  const values = [req.query.id];
  db.query(sql, values, function (err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

const getMyApplications = asyncHandler((req, res) => {
  // Handle the request to retrieve the student's society application information
  const sql =
    "SELECT society_name, position FROM society_membership WHERE member_id = ? and joined = false"; //use joined = false to get applications from society_membership
  const values = [req.query.id];
  db.query(sql, values, function (err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

module.exports = {
  editInfo,
  cvAboutMe,
  getMySocities,
  getMyApplications,
};
