import React, { useEffect, useState } from "react";
import API from "../services/api";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    API.get("/doctors").then((res) => setDoctors(res.data));
  }, []);

  return (
    <div>
      <h2>Doctors</h2>
      <ul>
        {doctors.map((doc) => (
          <li key={doc._id}>{doc.name} ({doc.email})</li>
        ))}
      </ul>
    </div>
  );
};

export default Doctors;
