const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const dotenv = require("dotenv");
dotenv.config({path:".env"});

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host:process.env.host,
    user: process.env.user,
    password:process.env.password,
    database: process.env.database
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/posts', (req, res) => {
    const { title, content, user_id, society_id, is_society_post } = req.body;
    const sql = `INSERT INTO Posts (title, content, user_id, society_id, is_society_post) VALUES (?, ?, ?, ?, ?)`;
    const values = [title, content, user_id, society_id, is_society_post];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Failed to create post' });
      }
      console.log(`Post with ID ${result.insertId} created`);
      return res.status(201).json({ message: 'Post created' });
    });
  });