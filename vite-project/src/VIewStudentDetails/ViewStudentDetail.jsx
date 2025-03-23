import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ViewStudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  //const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/students/${id}`
        );
        setStudent(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchStudent();
  }, [id]);

  if (!student) return <div>Loading....</div>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4 ">Student Details</h1>
      <table className="table table-bordered text-center ">
        <tbody>
          <tr>
            <th style={{ width: "30%" }}>ID</th>
            <td>{student.id}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>{student.name}</td>
          </tr>
          <tr>
            <th>Place</th>
            <td>{student.place}</td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>{student.phone}</td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
        Back to List
      </button>
    </div>
  );
};

export default ViewStudentDetail;
