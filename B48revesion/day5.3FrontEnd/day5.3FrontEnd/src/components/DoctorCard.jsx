import { Card, Rate } from "antd";
import { Link } from "react-router-dom";

const DoctorCard = ({ doctor }) => (
  <Card hoverable style={{ width: 300, margin: 16 }}>
    <img src={doctor.photoUrl} alt="doctor" style={{ width: "100%", borderRadius: "8px" }} />
    <h3>{doctor.name}</h3>
    <p>{doctor.specialties.join(", ")}</p>
    <Rate disabled defaultValue={doctor.avgRating} />
    <br />
    <Link to={`/doctor/${doctor._id}`}>View Profile</Link>
  </Card>
);

export default DoctorCard;
