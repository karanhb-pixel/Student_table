import { Link, useNavigate } from "react-router-dom";
import "./StudentTable.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../App";
export default function StudentTable() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    // Fetch data from backend API
    axios
      .get(`${BASE_URL}/api/data`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="studentTable">
      <h1 className="my-5 text-center">Student Table</h1>
      <div className="table-container">
        <Link to="/student/create" className="btn btn-primary my-2">
          ADD Student
        </Link>
        <table className="table table-bordered stable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Place</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.place}</td>
                  <td>{item.phone}</td>
                  <td>
                    <button
                      onClick={() => navigate(`/student/view/${item.id}`)}
                      className="btn btn-info button"
                    >
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/student/edit/${item.id}`)}
                      className="btn btn-primary button"
                    >
                      Edit
                    </button>
                    <button className="btn btn-danger button">Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
