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
export async function updateStudent(req, response) {

    let Student_id = req.body.Student_id
    let student_name = req.body.student_name
    let cv = req.body.cv
    let about_me = req.body.about_me

    let updateStudent = `UPDATE studentTable SET student_name = ?, cv = ?, about_me = ? WHERE Student_id= = ?`
    let fields = [student_name, cv, about_me, Student_id]

    console.log(req.body)
    let connection = validateConnection()
    connection.query(updateStudent, fields, (err, res) => {
        if (err) {
            let returnMessage = {
                isSuccessful: false,
                errorMessage: "Your info couldn't be updated"
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
export async function getStudentInfo(req, response) {

    let User_id = req.body.User_id

    let getInfo = `SELECT * FROM studentTable WHERE User_id = ?`
    let values = [User_id]

    let connection = validateConnection()
    connection.query(getInfo, [values], (err, res) => {
        if (err) {
            console.log(err)
        } else {

            let data = res[0]

            let returnMessage = {
                isSuccessful: true,
                student_name: data.student_name,
                cv: data.cv,
                about_me: data.about_me,
            }

            response.send(returnMessage)
            connection.end()
        }
    })
}
