import { useState } from "react";
import axios from "axios";
import "../stylesheets/feedback.css";
import "@fontsource/roboto";
import "@fontsource/poppins";
import "@fontsource/dm-sans";
import "@fontsource/cal-sans";
import "@fontsource/inter";
import { useNavigate } from "react-router-dom";

function Feedback() {
  const navigate = useNavigate();
  const [sender, setSender] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendFeedback = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://project-1-j62j.onrender.com/students/feedback`,
        {
          sender,
          email,
          message,
        },
      );

      setEmail("");
      setMessage("");
      setSender("");
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <div className="feedback-component">
        <h4
          className="back-link"
          style={{ position: "relative", left: "4%" }}
          onClick={() => navigate(-1)}
        >
          ◀ Go back
        </h4>
        <div className="feedback-intro">
          <h1 className="fi-header">Feedback Page</h1>
          <h3 className="fi-description">
            This is our feedback page, feel free to report back to us what you
            feel about our operations here at Kestrel College.
          </h3>
        </div>
        <div className="form">
          <form className="form-body" onSubmit={sendFeedback}>
            <input
              className="details"
              type="text"
              value={sender}
              placeholder="Enter sender's full name"
              onChange={(e) => setSender(e.target.value)}
            />
            <input
              className="details"
              type="email"
              value={email}
              placeholder="Enter sender's email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              className="text-area"
              name="message"
              id="msg"
              cols="30"
              rows="10"
              placeholder="Enter feedback message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button className="button" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Feedback;
