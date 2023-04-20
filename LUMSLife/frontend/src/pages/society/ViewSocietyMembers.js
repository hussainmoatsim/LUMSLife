import React, { useState, useEffect } from "react";

const ViewSocietyMembers = ({ societyID }) => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const response = await fetch(
      `/api/profile/society-members?id=${societyID}`
    );
    const data = await response.json();
    setMembers(data);
  };

  return (
    <div>
      <h2>View Society Members</h2>
      <ul>
        {members.map((member, index) => (
          <li key={index}>{member.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ViewSocietyMembers;
