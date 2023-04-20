const asyncHandler = require("express-async-handler");
const { db } = require("../config/db_create");
const dotenv = require("dotenv").config({ path: "../../.env" });


const validateConnection = () => {
  let connection = createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: false,
  });
  connection.connect((err) => {
    if (err) {
      console.log("Connection Failed");
    } else {
      console.log("Connected");
    }
  });
  return connection;
};

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

export async function removeSocietyAccount(req, response) {

  let Society_id = req.body.Society_id

  let connection = validateConnection()

  let deleteAccount = `DELETE FROM societyTable WHERE Society_id = ?`
  let values = [Society_id]

  connection.query(deleteAccount, values, (err, res) => {

      if (err) {
          let returnMessage = {
              isSuccessful: false,
              errorMessage: "Could not delete account"
          }
          response.send(returnMessage)
          connection.end()

      } else {
          let returnMessage = {
              isSuccessful: true
          }
          response.send(returnMessage)
          connection.end()
      }
  })
}
export async function updateSociety(req, response) {

    let Society_id = req.body.Society_id
    let society_name = req.body.society_name

    let updateSociety = `UPDATE societyTable SET society_name = ? WHERE Society_id= = ?`
    let fields = [society_name, Society_id]

    console.log(req.body)
    let connection = validateConnection()
    connection.query(updateSociety, fields, (err, res) => {
        if (err) {
            let returnMessage = {
                isSuccessful: false,
                errorMessage: "Society info couldn't be updated"
            }
            response.send(returnMessage)
            connection.end()

            console.log(err)

        } else {

            let returnMessage = {
                isSuccessful: true
            }
            response.send(returnMessage)
            connection.end()
        }
    })

    connection.end()
}
