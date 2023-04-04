const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config({ path: "../../.env" });
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

var connectionString = mysql.createConnection({
  database: process.env.DATABASE,
  host: "localhost",
  user: "root",
  password: "pass",
});
function createTable(CreateQuerry) {
  connectionString.query(CreateQuerry, (err, result) => {
    if (err) {
      console.log("Table creation failed");
      console.log(err);
    } else {
      console.log("Table created");
      //console.log(result);
    }
  });
}

const userTable =
  "CREATE TABLE IF NOT EXISTS " +
  process.env.database +
  ".User (User_id int NOT NULL AUTO_INCREMENT, User_type int, name varchar(255), email varchar(255), password_hash varchar(255), PRIMARY KEY (User_id))";
const studentTable =
  "CREATE TABLE IF NOT EXISTS " +
  process.env.database +
  ".Student (Student_id int NOT NULL AUTO_INCREMENT, User_id int NOT NULL, PRIMARY KEY (Student_id), FOREIGN KEY (User_id) REFERENCES User(User_id))";
const societyMemberTable =
  "CREATE TABLE IF NOT EXISTS " +
  process.env.database +
  ".Society_member (member_id int NOT NULL AUTO_INCREMENT, User_id int NOT NULL, membership int, PRIMARY KEY (member_id), FOREIGN KEY (User_id) REFERENCES User(User_id))";
const adminTable =
  "CREATE TABLE IF NOT EXISTS " +
  process.env.database +
  ".Admin (Admin_id int NOT NULL AUTO_INCREMENT, User_id int NOT NULL, PRIMARY KEY (Admin_id), FOREIGN KEY (User_id) REFERENCES User(User_id))";
const societyTable =
  "CREATE TABLE IF NOT EXISTS " +
  process.env.database +
  ".Society (Society_id int NOT NULL AUTO_INCREMENT, membership int, posts_id int, PRIMARY KEY (Society_id), FOREIGN KEY (posts_id) REFERENCES Posts(posts_id))";
const postsTable =
  "CREATE TABLE IF NOT EXISTS " +
  process.env.database +
  ".Posts (posts_id int NOT NULL AUTO_INCREMENT, title varchar(255), content varchar(255), user_id int, PRIMARY KEY (posts_id), FOREIGN KEY (user_id) REFERENCES User(User_id))";
const societyMembershipTable =
  "CREATE TABLE IF NOT EXISTS " +
  process.env.database +
  ".Society_membership (Society_id int NOT NULL, member_id int NOT NULL, joined bool, PRIMARY KEY (Society_id, member_id), FOREIGN KEY (Society_id) REFERENCES Society(Society_id), FOREIGN KEY (member_id) REFERENCES Society_member(member_id))";
const interactionsTable =
  "CREATE TABLE IF NOT EXISTS " +
  process.env.database +
  ".Interactions (post_id int NOT NULL, comment varchar(255), user_id int NOT NULL, liked bool, PRIMARY KEY (post_id, user_id), FOREIGN KEY (post_id) REFERENCES Posts(posts_id), FOREIGN KEY (user_id) REFERENCES User(User_id))";
const eventsTable =
  "CREATE TABLE IF NOT EXISTS " +
  process.env.database +
  ".Events (events_id int NOT NULL AUTO_INCREMENT, name varchar(255), society_id int, date date, PRIMARY KEY (events_id), FOREIGN KEY (society_id) REFERENCES Society(Society_id))";
const eventAttendanceTable =
  "CREATE TABLE IF NOT EXISTS " +
  process.env.database +
  ".Event_attendance (event_id int NOT NULL, user_id int NOT NULL, PRIMARY KEY (event_id, user_id), FOREIGN KEY (event_id) REFERENCES Events(events_id), FOREIGN KEY (user_id) REFERENCES User(User_id))";

connectionString.connect((error) => {
  // console.log(connectionString);
  if (!error) {
    console.log("Connection has been established");
    connectionString.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.database}`,
      (err2, result) => {
        if (err2) {
          console.log(err2);
        } else {
          console.log("Database Created");

          createTable(userTable);
          createTable(studentTable);
          createTable(societyMemberTable);
          createTable(adminTable);
          createTable(societyTable);
          createTable(postsTable);
          createTable(societyMembershipTable);
          createTable(interactionsTable);
          createTable(eventsTable);
          createTable(eventAttendanceTable);

          connectionString.end();
        }
      }
    );
  } else {
    console.log("Connection failed in db");
    console.log(error);
  }
});
