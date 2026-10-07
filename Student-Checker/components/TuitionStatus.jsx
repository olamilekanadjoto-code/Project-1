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

  useEffect(() => {
    const getStudent = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:2468/students/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudent(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    const calculateFee = () => {
      const owedAmount = Math.trunc(student.fee - student.paidFee);
    };
    calculateFee();
    getStudent();
  }, [id]);

  const payFees = async (e) => {
    e.preventDefault();
    try {
      const payment = await axios.put(
        `http://localhost:2468/students/payment/${id}`,
        {
          amountPaid,
        },
      );
      console.log(amountPaid);
      setSuccessMessage(payment.data);
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
        <span className="feePayment">
          <h4 className="fp-header">Pay fees: installmentally or one-time</h4>
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
      </div>
    </>
  );
}

export default Tuition;
