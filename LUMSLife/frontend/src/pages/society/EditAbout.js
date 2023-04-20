import React, { useState } from "react";

const EditAboutMe = () => {
  const [aboutMe, setAboutMe] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/api/profile/about-me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ aboutMe }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <h2>Edit About Me</h2>
      <form onSubmit={handleSubmit}>
        <label>About Me:</label>
        <textarea
          value={aboutMe}
          onChange={(e) => setAboutMe(e.target.value)}
          required
        />
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditAboutMe;
