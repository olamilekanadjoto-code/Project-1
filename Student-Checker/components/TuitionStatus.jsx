import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../stylesheets/tuitionStatus.css";
import "@fontsource/cal-sans";
import "@fontsource/dm-sans";
import "@fontsource/inter";
import "@fontsource/poppins";
import "@fontsource/nunito-sans";
import "@fontsource/roboto";

function Tuition() {
  const { id } = useParams();
  const [amountPaid, setAmountPaid] = useState(Number);
  const [student, setStudent] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);
  const [displayed, setDisplayed] = useState(true);

  useEffect(() => {
    const getStudent = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `https://project-1-j62j.onrender.com/students/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setStudent(res.data);

        if (Math.trunc(res.data.fee - res.data.paidFee) === 0) {
          setDisplayed(false);
        } else if (Math.trunc(res.data.fee - res.data.paidFee) < 0) {
          setDisplayed(false);
        } else {
          setDisplayed(true);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    getStudent();
  }, [id]);

  const payFees = async (e) => {
    e.preventDefault();
    try {
      const payment = await axios.put(
        `https://project-1-j62j.onrender.com/students/payment/${id}`,
        {
          amountPaid: Number(amountPaid),
        },
      );
      console.log(amountPaid);
      setSuccessMessage("Successful");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <div className="tuition-component">
        <span className="feeStatus">
          <h5 className="fs-header">{student.name}'s fee status</h5>
          <h4 className="total-fee">
            Tuition Fee:{" "}
            {student.fee?.toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
            })}
          </h4>
          <h4 className="paid-fee">
            Amount Paid:{" "}
            {student.paidFee?.toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
            })}
          </h4>
          <h4 className="owed-fee">
            {" "}
            Amount Owed:{" "}
            {Math.trunc(student.fee - student.paidFee)?.toLocaleString(
              "en-NG",
              {
                style: "currency",
                currency: "NGN",
              },
            )}
          </h4>
        </span>
        {displayed ? (
          <span className="feePayment">
            <h4 className="fp-header">Pay fees: installmentally or one-time</h4>
            <h5 style={{ color: "green", fontFamily: "Inter" }}>
              {successMessage}
            </h5>
            <form onSubmit={payFees}>
              <input
                type="number"
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
                placeholder="Enter amount"
                className="fp-input"
              />
              <button type="submit" className="fp-btn">
                Pay
              </button>
            </form>
            <h3 className="refresh-notice">
              Reload page to update payment info.
            </h3>
          </span>
        ) : null}
      </div>
    </>
  );
}

export default Tuition;
