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

const view_bookings = asyncHandler(async (req, res) => {
  const { event_id } = req.query;

  const sql = `
    SELECT u.User_id, u.name, u.email, b.confirmed
    FROM Bookings b
    JOIN User u ON b.user_id = u.User_id
    WHERE b.event_id = ?
  `;
  const [bookings] = await db.promise().query(sql, [event_id]);

  res.status(200).json({ bookings });
});

const confirm_booking = asyncHandler(async (req, res) => {
  const { booking_id } = req.body;

  const sql = `
    UPDATE Bookings
    SET confirmed = 1
    WHERE id = ?
  `;
  await db.promise().query(sql, [booking_id]);

  res.status(200).json({ message: "Booking confirmed" });
});

module.exports = {
  create_post,
  view_bookings,
  confirm_booking
};
