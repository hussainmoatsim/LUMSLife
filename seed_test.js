const dotenv = require("dotenv");
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser')
dotenv.config({path:".env"});
var app = express();
app.use(bodyParser.urlencoded({extended:true}));


var connectionString = mysql.createConnection(
    {
        host:process.env.host,
        user: process.env.user,
        password:process.env.password,
        database:process.env.database
    }
);

function seedData(query)
{
    return new Promise ((resolve, reject) => {
        connectionString.query(query, (err2, result) => {
            if (err2) {
                console.log("Seeding failed");
                reject(err2);
            }
            else {
                resolve();
                console.log("Seeding done");
            }
        })
    })
}

connectionString.connect(async (err)=>
{
    if(err)
    {
        console.log(err);
    }
    else
    {
        // Seed User table
        const seedUserQuery = `INSERT INTO User (User_type, name, email, password_hash) VALUES 
        ('Student' , 'Talha', 'talha@lums.edu.pk', 'password1'), 
        ('Member', 'Hussain', 'hussain@gmail.com.com', 'password2'), 
        ('Admin' , 'Jahanzaib', 'jahanzaib@lums.edu..com', 'password3'),
        ('Student' , 'Shaheer', 'shaheer@gmail.com', 'password4'),
        ('Member', 'Shafay', 'shafay@gmail.com', 'password5'),
        ('Admin' , 'Shahzaib', 'shahzaib@lums.edu.pk', 'password6')`;

        await seedData(seedUserQuery);

        // Seed Student table
        const seedStudentQuery = `INSERT INTO Student (User_id , Student_id) VALUES (1000 , 1000), (1003 , 1003)`;

        await seedData(seedStudentQuery);

        // Seed Society_member table
        const seedSocietyMemberQuery = `INSERT INTO Society_member (User_id , member_id) VALUES (1001 , 1001) , (1004 , 1004)`;

        await seedData(seedSocietyMemberQuery);

        // Seed Admin table
        const seedAdminQuery = `INSERT INTO Admin (User_id , Admin_id) VALUES (1003 , 1003), (1005 , 1005)`;

        await seedData(seedAdminQuery);

        // Seed Society table
        const seedSocietyQuery = `INSERT INTO Society (name, email) VALUES 
        ('LMS', 'lms@lumsedy.pk'),
        ('LES', 'les@lums.edu.pk')`;

        await seedData(seedSocietyQuery);

        // Seed Posts table
        const seedPostsQuery = `INSERT INTO Posts (title, content, user_id, society_id, is_society_post) VALUES 
        ('User post 1', 'This is the content of the first user post', 1000, NULL, false),
        ('User post 2', 'This is the content of the second user post', 1001, NULL, false),
        ('Society post 1', 'This is the content of the first society post', NULL, 1000, true),
        ('Society post 2', 'This is the content of the second society post', NULL, 1001, true)`;

        await seedData(seedPostsQuery);

        // Seed Society_membership table
        const seedSocietyMembershipQuery = `INSERT INTO Society_membership (member_id, Society_id, joined) VALUES 
        (1001, 1000, true),
        (1004, 1001, true),
        (1001, 1001, false)`;

        await seedData(seedSocietyMembershipQuery);


        // Seed Interactions table
        const seedInteractionsQuery = `INSERT INTO Interactions (post_id, comment, user_id, liked) VALUES 
        (1, 'comment 1', 1000, true),
        (2, 'comment 2', 1001, true),
        (3, 'comment 3', 1002, true),
        (4, 'comment 4', 1003, true)`;
      
        await seedData(seedInteractionsQuery);

        // Seed Events table
        const seedEventsQuery = `INSERT INTO events (name, society_id, date) VALUES 
        ('Workshop', 1000, '2023-04-07'),
        ('Conference', 1001, '2023-04-15'),
        ('Talk', 1001, '2023-04-23')`;

        await seedData(seedEventsQuery);

        // Seed Event_attendance table

        const seedEventAttendanceQuery = `INSERT INTO Event_attendance (event_id, user_id) VALUES 
        (1, 1000),
        (2, 1001),
        (3, 1002),
        (2, 1003)`;

        await seedData(seedEventAttendanceQuery);
        connectionString.end();
    }
});