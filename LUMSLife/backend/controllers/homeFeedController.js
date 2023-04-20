const { db } = require("../config/db_create");

exports.getHomeFeed = async (req, res) => {
  try {
    // Get all events
    const eventsQuery = `
      SELECT e.events_id, e.name, e.description, e.date, e.location, e.society_id, s.society_name
      FROM Events e
      JOIN Society s ON e.society_id = s.society_id
      ORDER BY e.events_id DESC
    `;
    const [events, __e] = await db.promise().query(eventsQuery);

    // Get all posts with the count of likes and comments, and include society_id and society name
    const postsQuery = `
    SELECT p.posts_id, p.title, p.description, p.user_id, p.date_time, p.society_id, s.society_name,
      SUM(CASE WHEN i.liked = true THEN 1 ELSE 0 END) as likes_count,
      COUNT(i.comment) as comments_count
    FROM Posts p
    LEFT JOIN Interactions i ON p.posts_id = i.post_id
    JOIN User u ON p.user_id = u.User_id
    JOIN Society s ON p.society_id = s.Society_id
    GROUP BY p.posts_id, u.name, s.society_name
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

    res.send({ posts: postsWithComments, events: events });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving home feed");
  }
};