const { createConnection } = require("mysql2");
const sha1 = require("sha1");
const asyncHandler = require("express-async-handler");
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
// const validateConnection = async () => {
//   try {
//     const connection = await createConnection({
//       host: "localhost",
//       user: "root",
//       password: "pass",
//       database: "undefined",
//       //   multipleStatements: false,
//     });

//     console.log("Connected to database");
//     return connection;
//   } catch (err) {
//     console.error("Connection failed", err);
//     throw err;
//   }
// };

const validateEmail = asyncHandler(async (req, response) => {
  let email = req.body.email;

  let connection = validateConnection();

  let emailValidation = `SELECT * FROM User WHERE email = ?`;
  let values = [email];

  connection.query(emailValidation, values, (err, res) => {
    if (err) {
      let returnMessage = {
        isSuccessful: false,
        errorMessage: "Validation request could not be processed",
      };
      response.send(returnMessage);
      connection.end();
    } else {
      if (res.length != 0) {
        let returnMessage = {
          isSuccessful: false,
          errorMessage: "Email already in use",
        };
        response.send(returnMessage);
        connection.end();
      } else {
        let returnMessage = {
          isSuccessful: true,
        };
        response.send(returnMessage);
        connection.end();
      }
    }
  });
});

const signup = asyncHandler(async (req, response) => {
  let email = req.body.email;
  let password = sha1(req.body.password);
  let accountType = req.body.accountType;

  let connection = validateConnection();

  let emailValidation = `SELECT * FROM User WHERE email = ?`;
  let values = [email];

  connection.query(emailValidation, values, (err, res) => {
    if (err) {
      let returnMessage = {
        isSuccessful: false,
        errorMessage: "Signup request could not be processed",
      };
      response.send(returnMessage);
      connection.end();
    } else {
      if (res.length != 0) {
        let returnMessage = {
          isSuccessful: false,
          errorMessage: "Email already in use",
        };
        response.send(returnMessage);
        connection.end();
      } else {
        let insertQuery = `INSERT INTO User (User_type, email, password_hash) VALUES (?)`;
        let values = [accountType, email, password];
        //inserting into User_type using variable accountType
        connection.query(insertQuery, [values], (err, res) => {
          if (err) {
            let returnMessage = {
              isSuccessful: false,
              errorMessage: "Signup request couldn't be processed",
            };
            response.send(returnMessage);
            connection.end();

            console.log(err);
          } else {
            let User_id = res.insertId;

            let returnMessage = {
              isSuccessful: true,
              accountID: User_id,
            };
            response.send(returnMessage);
            connection.end();
          }
        });
      }
    }
  });
});

const login = asyncHandler(async (req, response) => {
  let email = req.body.email;
  let password = sha1(req.body.password);

  let connection = validateConnection();

  let selectQuery = `SELECT * FROM User WHERE email = ?`;
  let values = [email, password];

  connection.query(selectQuery, values, (err, res) => {
    if (err) {
      let returnMessage = {
        isSuccessful: false,
        errorMessage: "Login request could not be processed",
      };
      response.send(returnMessage);

      console.log(err);
    } else {
      if (res.length == 0) {
        let returnMessage = {
          isSuccessful: false,
          errorMessage: "Email does not exist",
        };

        response.send(returnMessage);
        connection.end();
      } else {
        console.log(res);
        if (res[0].password_hash != password) {
          let returnMessage = {
            isSuccessful: false,
            errorMessage: "Password is incorrect",
          };

          response.send(returnMessage);
          connection.end();
        } else {
          let returnMessage = {
            isSuccessful: true,
            accountID: res[0].User_id,
            User_type: res[0].accountType,
          };

          response.send(returnMessage);
          connection.end();
        }
      }
    }
  });
  connection.end();
});
module.exports = {
  signup,
  login,
  validateEmail,
};
