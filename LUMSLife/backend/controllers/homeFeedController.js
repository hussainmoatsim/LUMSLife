const { db } = require("../config/db_create");

exports.getHomeFeed = async (req, res) => {
  try {
    // Get all posts with the count of likes and comments
    const postsQuery = `
    SELECT p.posts_id, p.title, p.description, p.user_id, p.date_time,
      SUM(CASE WHEN i.liked = true THEN 1 ELSE 0 END) as likes_count,
      COUNT(i.comment) as comments_count
    FROM Posts p
    LEFT JOIN Interactions i ON p.posts_id = i.post_id
    JOIN User u ON p.user_id = u.User_id
    GROUP BY p.posts_id, u.name
    ORDER BY p.posts_id DESC
    `;
    const [posts, _] = await db.promise().query(postsQuery);

    // Get all comments for each post

    const commentsQuery = ` 
      SELECT i.post_id, i.comment, i.user_id, u.name as author
      FROM Interactions i
      JOIN User u ON i.user_id = u.User_id
      WHERE i.comment IS NOT NULL
    `;
    const [comments, __] = await db.promise().query(commentsQuery);

    const postsWithComments = posts.map(post => {
      const postComments = comments.filter(c => c.post_id === post.posts_id);
      return { ...post, comments: postComments };
    });

    res.send(postsWithComments);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving home feed");
  }
};