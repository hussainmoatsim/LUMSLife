import React, { useState, useEffect } from "react";
import { getStudentApplications } from "../../API/api.js";

function MyApplications({ userId }) {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getStudentApplications(userId);
        setApplications(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [userId]);

  return (
    <div>
      <h2>My Applications</h2>
      {applications.map((application, index) => (
        <div key={index}>
          <p>Society Name: {application.society_name}</p>
          <p>Position: {application.position}</p>
          <p>Status: {application.status}</p>
        </div>
      ))}
    </div>
  );
}

export default MyApplications;
