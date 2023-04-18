import { getConnection } from './database.js'; //need the connection file to be made for this import
import sha1 from 'sha1';

export async function login(req, response) 
{
    let email = req.body.email;
    let hashed_password = sha1(req.body.password);

    let connection = getConnection();

    let selectQuery = `SELECT * FROM User WHERE email = ?`;
    let values = [email];

    connection.query(selectQuery, values, (err, res) => 
    {
        if (err) 
        {
            let returnMessage = 
            {
                "success": false,
                "message": "Login request could not be processed. Please try again later."
            }
            response.status(500).json(returnMessage);
            console.error(err);
        } 
        else 
        {
            if (res.length == 0)
            {
                let returnMessage = 
                {
                    "success": false,
                    "message": "Invalid credentials. Please check your email and password and try again."
                }
                response.status(401).json(returnMessage);
            } 
            else 
            {
                if (res[0].password != hashed_password) 
                {
                    let returnMessage = 
                    {
                        "success": false,
                        "message": "Invalid credentials. Please check your email and password and try again."
                    }
                    response.status(401).json(returnMessage);
                } 
                else 
                {
                    let returnMessage = 
                    {
                        "success": true,
                        "accountID": res[0].User_id,
                        "User_type": res[0].accountType
                    }
                    response.json(returnMessage);
                }  
            }
        }
        connection.end();
    });
}
