import { createConnection } from 'mysql2';
import { config } from 'dotenv';
import sha1 from 'sha1';

config({path:".env"});

function validateConnection() {

    let connection = createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        multipleStatements: false
    })

    connection.connect((err) => {
        if (err) {
            console.log("Connection Failed")
        } else {
            console.log("Connected")
        }
    })

    return connection
}
export async function validateEmail(req, response) {

    let email = req.body.email

    let connection = validateConnection()

    let emailValidation = `SELECT * FROM User WHERE email = ?`
    let values = [email]

    connection.query(emailValidation, values, (err, res) => {

        if (err) {
            let returnMessage = {
                "isSuccessful": false,
                "errorMessage": "Validation request could not be processed"
            }
            response.send(returnMessage)
            connection.end()

        } else {
            if (res.length != 0) {
                let returnMessage = {
                    "isSuccessful": false,
                    "errorMessage": "Email already in use"
                }
                response.send(returnMessage)
                connection.end()

            } else {    
                let returnMessage = {
                    "isSuccessful": true
                }
                response.send(returnMessage)
                connection.end()
            }
        }
    })
}
export async function signup(req, response) {

    let email = req.body.email
    let password = sha1(req.body.password)
    let accountType = req.body.accountType

    let connection = validateConnection()

    let emailValidation = `SELECT * FROM User WHERE email = ?`
    let values = [email]

    connection.query(emailValidation, values, (err, res) => {

        if (err) {
            let returnMessage = {
                "isSuccessful": false,
                "errorMessage": "Signup request could not be processed"
            }
            response.send(returnMessage)
            connection.end()

        } else {
            if (res.length != 0) {
                let returnMessage = {
                    "isSuccessful": false,
                    "errorMessage": "Email already in use"
                }
                response.send(returnMessage)
                connection.end()

            } else {
                let insertQuery = `INSERT INTO User (User_type, email, password) VALUES (?)`
                let values = [accountType, email, password]
                //inserting into User_type using variable accountType
                connection.query(insertQuery, [values], (err, res) => {
            
                    if (err) {
                        let returnMessage = {
                            "isSuccessful": false,
                            "errorMessage": "Signup request couldn't be processed"
                        }
                        response.send(returnMessage)
                        connection.end()
            
                        console.log(err)
                        
                    } else {
                        let User_id = res.insertId
            
                        let returnMessage = {
                            "isSuccessful": true,
                            "accountID": User_id
                        }
                        response.send(returnMessage)
                        connection.end()
                    }
                })

            }
        }
    })
}

export async function login(req, response) {

    let email = req.body.email
    let password = sha1(req.body.password)

    let connection = validateConnection()

    let selectQuery = `SELECT * FROM User WHERE email = ?`
    let values = [email, password]

    connection.query(selectQuery, values, (err, res) => {

        if (err) {
            let returnMessage = {
                "isSuccessful": false,
                "errorMessage": "Login request could not be processed"
            }
            response.send(returnMessage)

            console.log(err)

        } else {

            if (res.length == 0){
                let returnMessage = {
                    "isSuccessful": false,
                    "errorMessage": "Email does not exist"
                }

                response.send(returnMessage)
                connection.end()

            } else {
                if (res[0].password != password) {
                    let returnMessage = {
                        "isSuccessful": false,
                        "errorMessage": "Password is incorrect"
                    }
    
                    response.send(returnMessage)
                    connection.end()
                } else {
                    let returnMessage = {
                        "isSuccessful": true,
                        "accountID": res[0].User_id,
                        "User_type": res[0].accountType
                    }
    
                    response.send(returnMessage)
                    connection.end()
                }  
            }
        }
    })



    connection.end()
}

export async function createPost(req, res) {
    const { title, content, user_id, society_id, is_society_post } = req.body;

    const connection = validateConnection();

    const insertQuery = `INSERT INTO Posts (title, content, user_id, society_id, is_society_post) VALUES (?, ?, ?, ?, ?)`;

    const values = [title, content, user_id, society_id, is_society_post];

    connection.query(insertQuery, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                success: false,
                message: "Error creating post"
            });
        } else {
            console.log(result);
            res.send({
                success: true,
                message: "Post created successfully",
                post_id: result.insertId
            });
        }

        connection.end();
    });
}


