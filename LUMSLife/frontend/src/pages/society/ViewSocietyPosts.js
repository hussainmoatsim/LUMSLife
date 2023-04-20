import React, { useState, useEffect } from "react";

const ViewSocietyPosts = ({ societyID }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`/api/profile/posts/${societyID}`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, [societyID]);

  return (
    <div>
      <h2>Society Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.post_id}>{post.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default ViewSocietyPosts;
