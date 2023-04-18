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

module.exports = {
  interact_post,
};
