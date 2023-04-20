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
    JOIN Society_member m ON sm.User_id = m.member_id
    WHERE m.User_id = ? AND sm.joined = 1
  `;

  const [societies] = await db.promise().query(sql, [user_id]);
  console.log(user_id);
  console.log(societies);

  res.status(200).json({ societies: societies.map(s => s.society_name) });
});

const viewApplications = asyncHandler(async (req, res) => {
  const { society_name } = req.query;
  console.log(society_name);

  const society_sql = `SELECT Society_id FROM Society WHERE society_name = ?`;
  const [society] = await db.promise().query(society_sql, [society_name]);
  const society_id = society[0].Society_id;

  console.log(society_id);

  const sql = `
    SELECT sm.Society_id, u.User_id, u.name, st.cv, st.about_me
    FROM Society_membership sm
    JOIN User u ON sm.User_id = u.User_id
    JOIN Student st ON u.User_id = st.User_id
    WHERE sm.joined = 0 AND sm.Society_id = ?
  `;

  const [applications] = await db.promise().query(sql, [society_id]);

  res.status(200).json({ applications });
});


const acceptApplication = asyncHandler(async (req, res) => {
  const { name , society_name } = req.body;

  const user_sql = `SELECT User_id FROM User WHERE name = ?`;
  const [user] = await db.promise().query(user_sql, [name]);
  const member_id = user[0].User_id;

  const society_sql = `SELECT Society_id FROM Society WHERE society_name = ?`;
  const [society] = await db.promise().query(society_sql, [society_name]);
  const society_id = society[0].Society_id;

  const check_membership_sql = `
    SELECT * FROM Society_membership WHERE User_id = ? AND Society_id = ? AND joined = 1
  `;
  const [membership] = await db.promise().query(check_membership_sql, [member_id, society_id]);

  if (membership.length === 0) {
    // Insert into Society_member if the student is not a member of any society
    const insert_member_sql = `
      INSERT INTO Society_member (User_id, member_id) VALUES (?, ?)
    `;
    await db.promise().query(insert_member_sql, [member_id, member_id]);
  }

  const sql = `
    UPDATE Society_membership
    SET joined = 1
    WHERE User_id = ? AND Society_id = ?
  `;
  await db.promise().query(sql, [member_id, society_id]);

  res.status(200).json({ message: "Application accepted" });
});


module.exports = {
  create_post,
  view_bookings,
  confirm_booking,
  getJoinedSocieties,
  viewApplications,
  acceptApplication
};
