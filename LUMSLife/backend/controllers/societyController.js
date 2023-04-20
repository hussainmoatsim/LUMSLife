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
    society_name,
  } = req.body;

  const society_sql = `SELECT Society_id FROM Society WHERE society_name = ?`;
  const [society] = await db.promise().query(society_sql, [society_name]);
  const society_id = society[0].Society_id;

  const sql = `INSERT INTO Posts (title, date_time, category, description, location, user_id, society_id) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`; // added society_id

  const values = [
    title,
    dateTime,
    eventCategory,
    eventDescription,
    eventLocation,
    user_id,
    society_id, // added society_id
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

const getJoinedSocieties = asyncHandler(async (req, res) => {
  console.log("getJoinedSocieties");
  const user_id = req.query.user_id;

  const sql = `
    SELECT s.society_name
    FROM Society_membership sm
    JOIN Society s ON sm.Society_id = s.Society_id
    JOIN Society_member m ON sm.member_id = m.member_id
    WHERE m.User_id = ? AND sm.joined = 1
  `;

  const [societies] = await db.promise().query(sql, [user_id]);
  console.log(user_id);
  console.log(societies);

  res.status(200).json({ societies: societies.map(s => s.society_name) });
});


module.exports = {
  create_post,
  view_bookings,
  confirm_booking,
  getJoinedSocieties
};
