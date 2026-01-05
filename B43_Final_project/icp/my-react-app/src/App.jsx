import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
  });

  const [submitData, setSbmitData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    setSbmitData(formData);
  };
  return (
    <>
      <div>
        <h1>Form</h1>

        <form onSubmit={handlesubmit}>
          <div>
            <label>Name:</label>
            <br />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <br />
            <input
              type="eamil"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Gender:</label>
            <br />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <br />
          <button type="submit">Submit</button>
        </form>

        {submitData && (
          <div>
            <h3>Submitted Details</h3>
            <p>Name:{submitData.name}</p>
            <p>Email:{submitData.email}</p>
            <p>Gender:{submitData.gender}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;