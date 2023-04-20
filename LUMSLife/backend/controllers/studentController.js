const asyncHandler = require("express-async-handler");
const { db } = require("../config/db_create");

const interact_post = asyncHandler(async (req, res) => {
  let { post_id, user_id, liked, comment } = req.body;
  //get user name from user id
    const name_sql = `SELECT name FROM User WHERE User_id = ?`;
    const [user, _] = await db.promise().query(name_sql, [user_id]);
    const name = user[0].name;
    comment = name + ": " + comment;

  const sql = `INSERT INTO Interactions (post_id, user_id, liked, comment) 
             VALUES (?, ?, ?, ?)`;

  const values = [post_id, user_id, liked, comment];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Failed to interact with the post" });
    }
    console.log(`Interaction with post ID ${post_id} created`);
    return res.status(201).json({ message: "Post interaction created" });
  });
});


const bookEvent = asyncHandler(async (req, res) => {
  const { user_id, event_id } = req.body;

  // Check if the user has already booked the event
  const unconfirmedBookingSQL = `
    SELECT COUNT(*) as unconfirmed_count
    FROM Bookings
    WHERE user_id = ? AND confirmed = 0
  `;
  const [unconfirmedResult] = await db.promise().query(unconfirmedBookingSQL, [user_id]);
  const unconfirmedCount = unconfirmedResult[0].unconfirmed_count;

  
  if (unconfirmedCount >= 1) { //prevents users from booking more than one event at a time
    return res.status(400).json({ message: "Too many unconfirmed bookings" });
  }

  // Book the event
  const bookingSQL = `
    INSERT INTO Bookings (user_id, event_id, confirmed)
    VALUES (?, ?, 0)
  `;
  await db.promise().query(bookingSQL, [user_id, event_id]);

  res.status(201).json({ message: "Event booked successfully" });
});

const applyForSociety = asyncHandler(async (req, res) => {
  const { user_id, society_id } = req.body;
  console.log(`user_id: ${user_id}, society_id: ${society_id}`);

  const checkMembershipSQL = `
    SELECT COUNT(*) as membership_count
    FROM Society_membership
    WHERE Society_id = ? AND User_id = ?
  `;
  const [membershipResult] = await db.promise().query(checkMembershipSQL, [society_id, user_id]);
  const membershipCount = membershipResult[0].membership_count;

  if (membershipCount > 0) {
    return res.status(400).json({ message: "You have already applied for this society." });
  }

  const applySQL = `
    INSERT INTO Society_membership (Society_id, User_id, joined)
    VALUES (?, ?, 0)
  `;
  await db.promise().query(applySQL, [society_id, user_id]);

  res.status(201).json({ message: "Society application submitted successfully" });
});

module.exports = {
  interact_post,
  bookEvent,
  applyForSociety
};
