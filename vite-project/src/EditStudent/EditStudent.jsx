import { useEffect, useState } from "react";
import "./EditStudent.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditStudent = () => {
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();
  const navitage = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/students/${id}`
        );
        const studentData = response.data;
        setName(studentData.name);
        setPlace(studentData.place);
        setPhone(studentData.phone);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchStudent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/students/${id}`, {
        name,
        place,
        phone,
      });
      navitage("/");
    } catch (err) {
      setError("Failed to update student details");
    }
  };
  return (
    <div className="editStudent">
      <h1 className="my-4">Edit Student Details</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name :</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="place">PLace :</label>
          <input
            type="text"
            className="form-control"
            placeholder="Place"
            id="place"
            name="place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone :</label>
          <input
            type="numb"
            className="form-control"
            placeholder="Phone"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button className="btn btn-primary my-3" type="submit">
            Update
          </button>
          <Link to="/" className="btn btn-danger my-3">
            Back
          </Link>
        </div>
      </form>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};
export default EditStudent;
