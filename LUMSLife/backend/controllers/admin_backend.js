const express = require('express');
const app = express();
const mysql = require('mysql2');
const { db } = require("../config/db_create");


// for deleting a student's account
app.delete('/students/:studentId', (req, res) => {
    const studentId = req.params.studentId;
  
    // Get the currently logged in user's ID from the request headers
    const userId = req.headers['user-id'];
  
    // Check if the logged in user is an admin
    pool.query('SELECT * FROM Admin WHERE User_id = ?', [userId], (adminErr, adminResults) => {
      if (adminErr) {
        console.error('Error checking admin status: ', adminErr);
        return res.status(500).json({ message: 'An error occurred while checking admin status.' });
      }
  
      if (adminResults.length === 0) {
        // If the user is not an admin, return a 403 Forbidden error
        return res.status(403).json({ message: 'You are not authorized to perform this action.' });
      }
  
      // Delete the student's account by their student ID
      pool.query('DELETE FROM Student WHERE Student_id = ?', [studentId], (studentErr, studentResults) => {
        if (studentErr) {
          console.error('Error deleting student account: ', studentErr);
          return res.status(500).json({ message: 'An error occurred while deleting the student account.' });
        }
  
        if (studentResults.affectedRows === 0) {
          return res.status(404).json({ message: 'Student not found.' });
        }
  
        // Delete the user account associated with the student
        pool.query('DELETE FROM User WHERE User_id = ?', [studentResults[0].User_id], (userErr, userResults) => {
          if (userErr) {
            console.error('Error deleting user account: ', userErr);
            return res.status(500).json({ message: 'An error occurred while deleting the user account.' });
          }
  
          res.status(200).json({ message: 'Student account deleted successfully.' });
        });
      });
    });
  });

  
// for deleting a society's account
app.delete('/societies/:societyId', (req, res) => {
    const societyId = req.params.societyId;
  
    // Get the currently logged in user's ID from the request headers
    const userId = req.headers['user-id'];
  
    // Check if the logged in user is an admin
    pool.query('SELECT * FROM Admin WHERE User_id = ?', [userId], (adminErr, adminResults) => {
      if (adminErr) {
        console.error('Error checking admin status: ', adminErr);
        return res.status(500).json({ message: 'An error occurred while checking admin status.' });
      }
  
      if (adminResults.length === 0) {
        // If the user is not an admin, return a 403 Forbidden error
        return res.status(403).json({ message: 'You are not authorized to perform this action.' });
      }
  
      // Delete the society account by its ID
      pool.query('DELETE FROM Society WHERE Society_id = ?', [societyId], (societyErr, societyResults) => {
        if (societyErr) {
          console.error('Error deleting society account: ', societyErr);
          return res.status(500).json({ message: 'An error occurred while deleting the society account.' });
        }
  
        if (societyResults.affectedRows === 0) {
          return res.status(404).json({ message: 'Society not found.' });
        }
  
        res.status(200).json({ message: 'Society account deleted successfully.' });
      });
    });
  });
  

// for deleting a student's comment
app.delete('/posts/:postId/comments/:commentId', (req, res) => {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
  
    // Get the currently logged in user's ID from the request headers
    const userId = req.headers['user-id'];
  
    // First, check if the user is the student who posted the comment
    pool.query('SELECT * FROM Student WHERE User_id = ?', [userId], (studentErr, studentResults) => {
      if (studentErr) {
        console.error('Error checking student status: ', studentErr);
        return res.status(500).json({ message: 'An error occurred while checking student status.' });
      }
  
      if (studentResults.length === 0) {
        return res.status(403).json({ message: 'Unauthorized access.' });
      }
  
      // If the user is the student, delete the comment
      pool.query('DELETE FROM Interactions WHERE post_id = ? AND comment_id = ? AND user_id = ?', [postId, commentId, userId], (err, results) => {
        if (err) {
          console.error('Error deleting comment: ', err);
          return res.status(500).json({ message: 'An error occurred while deleting comment.' });
        }
  
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'Comment not found.' });
        }
  
        res.status(204).send();
      });
    });
  });

  

