import React, { useState, useEffect } from "react";
import { getStudentSocieties } from "../../API/api.js";

function MySocieties({ userId }) {
  const [societies, setSocieties] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getStudentSocieties(userId);
        setSocieties(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [userId]);

  return (
    <div>
      <h2>My Societies</h2>
      {societies.map((society, index) => (
        <div key={index}>
          <p>Society Name: {society.society_name}</p>
          <p>Position: {society.position}</p>
        </div>
      ))}
    </div>
  );
}

export default MySocieties;
