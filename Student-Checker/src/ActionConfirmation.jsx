import { useState } from "react";
import "../stylesheets/actionConfirmation.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Confirmation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [matricNo, setMatricNo] = useState("");

  const onSubmit = async () => {
    try {
      const res = axios.post(
        `https://project-1-j62j.onrender.com/students/confirm`,
        {
          matricNo,
        },
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteStudent = async () => {
    try {
      const res = await axios.delete(
        `https://project-1-j62j.onrender.com/students/${id}`,
      );
      navigate("/home");
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit();
      await deleteStudent();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <div className="confirmation-component">
        <div className="cc-panel">
          <h2 className="cc-header">
            Matric_no is required before deleting student profile
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Matric_no"
              value={matricNo}
              onChange={(e) => setMatricNo(e.target.value)}
            />
            <button type="submit">Confirm</button>
          </form>
          <h3 className="cc-warning">This action cannot be undone</h3>
        </div>
      </div>
    </>
  );
}

export default Confirmation;
