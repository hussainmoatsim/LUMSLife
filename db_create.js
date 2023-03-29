const dotenv = require("dotenv");
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser')
dotenv.config({path:".env"});
const app = express();
app.use(bodyParser.urlencoded({extended:true}));


var connectionString = mysql.createConnection(
    {
        host:process.env.host,
        user: process.env.user,
        password:process.env.password
    }
);
function createTable(CreateQuerry)
{
    connectionString.query(CreateQuerry,
        (err,result)=>
        {
            if(err)
            {
                console.log("Table creation failed");
                console.log(err);
            }
            else
            {
                console.log("Table created");
                //console.log(result);
            }
        });
}

const first_user_id = 1000;

const createUserTableQuery = `CREATE TABLE IF NOT EXISTS ${process.env.database}.User (
    User_id int NOT NULL AUTO_INCREMENT,
    User_type varchar(255),
    name varchar(255),
    email varchar(255),
    password_hash varchar(255),
    PRIMARY KEY (User_id)
  ) AUTO_INCREMENT=${first_user_id}`;

  const createStudentTableQuery = `CREATE TABLE IF NOT EXISTS ${process.env.database}.Student (
    User_id int NOT NULL,
    Student_id int NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (Student_id),
    FOREIGN KEY (User_id) REFERENCES User(User_id)
  ) AUTO_INCREMENT=${first_user_id}`;

  const createSocietyMemberTableQuery = `CREATE TABLE IF NOT EXISTS ${process.env.database}.Society_member (
    User_id int NOT NULL,
    member_id int NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (member_id),
    FOREIGN KEY (User_id) REFERENCES User(User_id)
  ) AUTO_INCREMENT=${first_user_id}`;

  const createAdminTableQuery = `CREATE TABLE IF NOT EXISTS ${process.env.database}.Admin (
    User_id int NOT NULL,
    Admin_id int NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (Admin_id),
    FOREIGN KEY (User_id) REFERENCES User(User_id)
  ) AUTO_INCREMENT=${first_user_id}`;

  const createSocietyTableQuery = `CREATE TABLE IF NOT EXISTS ${process.env.database}.Society (
    Society_id int NOT NULL AUTO_INCREMENT,
    name varchar(255),
    email varchar(255),
    PRIMARY KEY (Society_id)
  ) AUTO_INCREMENT=1000;`;

  const createPostsTableQuery = `CREATE TABLE IF NOT EXISTS ${process.env.database}.Posts (
    posts_id int NOT NULL AUTO_INCREMENT,
    title varchar(255),
    content varchar(255),
    user_id int,
    society_id int,
    is_society_post bool,
    PRIMARY KEY (posts_id),
    FOREIGN KEY (user_id) REFERENCES User(User_id),
    FOREIGN KEY (society_id) REFERENCES Society(Society_id)
  )`;

  const createSocietyMembershipTableQuery = `CREATE TABLE IF NOT EXISTS ${process.env.database}.Society_membership (
    member_id int NOT NULL,
    Society_id int NOT NULL,
    joined bool,
    PRIMARY KEY (member_id, Society_id),
    FOREIGN KEY (member_id) REFERENCES Society_member(member_id),
    FOREIGN KEY (Society_id) REFERENCES Society(Society_id)
  )`;

  const createInteractionsTableQuery = `CREATE TABLE IF NOT EXISTS ${process.env.database}.Interactions (
    post_id int NOT NULL,
    comment varchar(255),
    user_id int,
    liked bool,
    FOREIGN KEY (post_id) REFERENCES Posts(posts_id),
    FOREIGN KEY (user_id) REFERENCES User(User_id)
  )`;

  const createEventsTableQuery = `CREATE TABLE IF NOT EXISTS ${process.env.database}.Events (
    events_id int NOT NULL AUTO_INCREMENT,
    name varchar(255),
    society_id int,
    date date,
    PRIMARY KEY (events_id),
    FOREIGN KEY (society_id) REFERENCES Society(Society_id)
  )`;

  const createEventAttendanceTableQuery = `CREATE TABLE IF NOT EXISTS ${process.env.database}.Event_attendance (
    event_id int NOT NULL,
    user_id int NOT NULL,
    PRIMARY KEY (event_id, user_id),
    FOREIGN KEY (event_id) REFERENCES Events(events_id),
    FOREIGN KEY (user_id) REFERENCES User(User_id)
    )`;




connectionString.connect((error)=>
{
    if(!error)
    {
        console.log("Connection has been established");
        connectionString.query(`CREATE DATABASE IF NOT EXISTS ${process.env.database}`, (err2,result) =>
        {
            if(err2)
            {
                console.log(err2);
            }
            else
            {
                console.log("Database Created");
                
                createTable(createUserTableQuery);
                createTable(createStudentTableQuery);
                createTable(createSocietyMemberTableQuery);
                createTable(createAdminTableQuery);
                createTable(createSocietyTableQuery);
                createTable(createPostsTableQuery);
                createTable(createSocietyMembershipTableQuery);
                createTable(createInteractionsTableQuery);
                createTable(createEventsTableQuery);
                createTable(createEventAttendanceTableQuery);



                connectionString.end();
            }
        });
    }
    else
    {
        console.log("Connection failed");
        console.log(error);
    }
});