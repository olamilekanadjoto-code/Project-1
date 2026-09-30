import axios from "axios";
import { useState } from "react";
import "../stylesheets/login.css";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function LoginComponent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [display, setDisplay] = useState(true);

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://project-1-j62j.onrender.com/students/login`,
        {
          email,
          password,
        },
      );
      const token = res.data;
      const decodedToken = await jwtDecode(token);
      await localStorage.setItem("token", token);
      navigate(`/students/${decodedToken.id}`);
    } catch (err) {
      console.error(err.message);
      setError("Incorrect Credentials");
    }
  };

  return (
    <>
      <div
        className={
          display ? "login-component-displayed" : "login-component-hidden"
        }
      >
        <div className="lc-body">
          <h4 style={{ color: "red", fontFamily: "Poppins" }}>{error}</h4>
          <h4 className="lc-header">
            Enter student's details to access profile
          </h4>
          <form action="" className="lc-form" onSubmit={onLogin}>
            <input
              type="email"
              className="lc-input"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="lc-input"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="lc-submit-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginComponent;
