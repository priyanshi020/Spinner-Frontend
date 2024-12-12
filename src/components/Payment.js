import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../service";
import "./CSS/payment.css";

const Payment = () => {
  const [name, setName] = useState("");
  const [upiId, setUpiId] = useState("");
  const [loading, setLoading] = useState(false); // State for loading
  const prize = localStorage.getItem("prizeAmount");
  const username = localStorage.getItem("userName");
  const mobileNumber = localStorage.getItem("mobileNumber");
  const generateBeneficiaryId = (email) =>
    `bene_${email.split("@")[0]}_${Date.now()}`;
  const generateTransferId = () => `txn_${Date.now()}`;

  const handlePayment = async () => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}api/addBeneficiary`, {
        beneId:generateBeneficiaryId(name),
        name:username,
        email:name,
        phone:mobileNumber,
        vpa:upiId,
      });

      const transferResponse = await axios.post(
        `${API_URL}api/initiateTransfer`,
        {
          beneId: generateBeneficiaryId(name),
          transferId: generateTransferId(),
          amount: prize,
          transferMode: "UPI",
          remarks: "Test",
        }
      );
      alert("Transfer Successful");
      console.log("Transfer Response:", transferResponse.data);
      // const { data } = await axios.post(`${API_URL}payouts/send`, {
      //   name: username,
      //   contactNumber: mobileNumber,
      //   email: name,
      //   amount: prize,
      //   upiId: upiId,
      // });

      if (transferResponse?.status === 200) {
        alert("Payment successful!");
      } else {
        alert("Some error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Apps">
      <div
        className="card bg-white text-dark"
        style={{ borderRadius: "1rem", maxWidth: "500px", width: "100%" }}
      >
        <div className="card-body p-5 text-center">
          <div className="mb-md-5 mt-md-4 pb-3">
            <h2 className="fw-bold mb-2 text-uppercase">Payment</h2>
            <p className="text-dark-50 mb-5">
              Please enter your Email and UPI Id for secure payment
            </p>
            <div className="form-outline form-white mb-4">
              <label className="form-label" htmlFor="typeEmailX">
                Email
              </label>
              <input
                type="email"
                value={name}
                placeholder="john@gmail.com"
                onChange={(e) => setName(e.target.value)}
                id="typeEmailX"
                className="form-control form-control-lg"
              />
            </div>
            <div className="form-outline form-white mb-4">
              <label className="form-label" htmlFor="typePasswordX">
                UPI Id
              </label>
              <input
                type="text"
                value={upiId}
                placeholder="john@upi.com"
                onChange={(e) => setUpiId(e.target.value)}
                id="typePasswordX"
                className="form-control form-control-lg"
              />
            </div>
            <button
              onClick={handlePayment}
              style={{ backgroundColor: "#FF6005", color: "white" }}
              className="btn  btn-lg px-5 mt-5"
              type="submit"
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <span>
                  <i className="fas fa-spinner fa-spin"></i> Processing...
                </span>
              ) : (
                "Pay with Razorpay"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
