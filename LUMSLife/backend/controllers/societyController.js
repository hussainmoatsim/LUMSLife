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

module.exports = {
  create_post,
};
