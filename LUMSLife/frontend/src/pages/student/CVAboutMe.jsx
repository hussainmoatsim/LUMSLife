import React, { useState, useEffect } from "react";
import { getStudentCVAboutMe } from "../../API/api.js";
// import ".../CSS/CVAboutMe.css";

function CVAboutMe({ userId }) {
  const [cv, setCV] = useState("");
  const [aboutMe, setAboutMe] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getStudentCVAboutMe(userId);
        setCV(response.data.cv);
        setAboutMe(response.data.about_me);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [userId]);

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
