import React, { useState, useEffect } from "react";
import axios from "axios";
// import ".../CSS/CVAboutMe.css";

function CVAboutMe() {
  const [cv, setCV] = useState("");
  const [aboutMe, setAboutMe] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/profile/cv-about-me");
        setCV(response.data.cv);
        setAboutMe(response.data.about_me);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h2>CV</h2>
      <p>{cv}</p>
      <h2>About Me</h2>
      <p>{aboutMe}</p>
    </div>
  );
}

export default CVAboutMe;
