const asyncHandler = require("express-async-handler");
const { db } = require("../config/db_create");

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

export async function removeStudentAccount(req, response) {

    let Student_id = req.body.Student_id

    let connection = validateConnection()

    let deleteAccount = `DELETE FROM studentTable WHERE Student_id = ?`
    let values = [Student_id]

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