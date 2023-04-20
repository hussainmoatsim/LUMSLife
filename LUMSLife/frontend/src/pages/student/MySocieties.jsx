import React, { useState, useEffect } from "react";
import axios from "axios";

function MySocieties() {
  const [societies, setSocieties] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/profile/my-societies");
        setSocieties(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

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
