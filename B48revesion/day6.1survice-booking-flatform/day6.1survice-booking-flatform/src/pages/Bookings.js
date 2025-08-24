import React, { useEffect, useState } from "react";
import API from "../services/api";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({ doctor: "", date: "" });
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    API.get("/bookings").then((res) => setBookings(res.data));
    API.get("/doctors").then((res) => setDoctors(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/bookings", form);
    alert("Booking created!");
    window.location.reload();
  };

  return (
    <div>
      <h2>Book Session</h2>
      <form onSubmit={handleSubmit}>
        <select onChange={(e) => setForm({ ...form, doctor: e.target.value })}>
          <option>Select Doctor</option>
          {doctors.map((doc) => (
            <option value={doc._id} key={doc._id}>{doc.name}</option>
          ))}
        </select>
        <input type="date" onChange={(e) => setForm({ ...form, date: e.target.value })} />
        <button type="submit">Book</button>
      </form>

      <h2>My Bookings</h2>
      <ul>
        {bookings.map((b) => (
          <li key={b._id}>{b.patient.name} booked {b.doctor.name} on {new Date(b.date).toDateString()}</li>
        ))}
      </ul>
    </div>
  );
};

export default Bookings;
