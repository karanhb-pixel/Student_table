import { useState } from "react";
import "./CreateStudent.css";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../App";
export default function CreateStudent() {
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navitage = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    //check for empty feilds
    if (!name.trim() || !place.trim() || !phone.trim()) {
      setError("All fields are required!");
      return;
    }

    const studentData = { name, place, phone };

    fetch(`${BASE_URL}/api/students`, {
      // Changed endpoint to /api/students
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to insert data");
        return res.json();
      })
      .then((data) => {
        setError(""); // crear error on success
        alert("Student Data Sucessfully Added.");
        // Reset form fields or refresh data
        setName("");
        setPlace("");
        setPhone("");
        navitage("/");
      })
      .catch((err) => console.error("Error:", err.message));
  };

  return (
    <div className="createStudent">
      <h1 className="my-4">Add Student</h1>
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
            Add
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
}
