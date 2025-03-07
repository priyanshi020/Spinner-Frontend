import React, { useState } from "react";
import axios from "axios";
import { PAYOUT_URL } from "../service";
import "./CSS/payment.css";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [email, setEmail] = useState("");
  const [upiId, setUpiId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const prize = localStorage.getItem("prizeAmount");
  const username = localStorage.getItem("userName");
  const mobileNumber = localStorage.getItem("mobileNumber");

  const generateBeneficiaryId = (email) =>
    `bene_${email?.split("@")[0] || "user"}_${Date.now()}`;

  const generateTransferId = () => `txn_${Date.now()}`;

  const handlePayment = async () => {
    if (!email || !upiId) {
      alert("Please enter both Email and UPI ID.");
      return;
    }

    setLoading(true);
    const beneId = generateBeneficiaryId(email);

    try {
      // Add Beneficiary API Call
      await axios.post(`${PAYOUT_URL}beneficiary`, {
        beneficiary_id: beneId,
        beneficiary_name: username,
        beneficiary_contact_details: {
          beneficiary_phone: mobileNumber,
          beneficiary_email: email,
        },
        beneficiary_instrument_details: {
          vpa: upiId,
        },
      });

      // Make Payout API Call
      const transferResponse = await axios.post(
        `${PAYOUT_URL}transfers`,
        {
          transfer_id: generateTransferId(),
          transfer_amount: parseFloat(prize) || 0, // Ensure it's a valid number
          transfer_mode: "upi",
          transfer_remarks: "Test Payment",
          beneficiary_details: {
            beneficiary_id: beneId,
            beneficiary_name: username,
            beneficiary_instrument_details: {
              vpa: upiId,
            },
          },
          beneficiary_contact_details: {
            beneficiary_phone: mobileNumber,
            beneficiary_email: email,
          },
        }
      );

      if (transferResponse?.status === 200) {
        alert("Payment successful!");
        navigate("/");
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during payment. Please try again.");
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
              Please enter your Email and UPI ID for secure payment.
            </p>
            <div className="form-outline form-white mb-4">
              <label className="form-label" htmlFor="typeEmailX">
                Email
              </label>
              <input
                type="email"
                value={email}
                placeholder="john@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                id="typeEmailX"
                className="form-control form-control-lg"
              />
            </div>
            <div className="form-outline form-white mb-4">
              <label className="form-label" htmlFor="typeUpiX">
                UPI ID
              </label>
              <input
                type="text"
                value={upiId}
                placeholder="john@upi.com"
                onChange={(e) => setUpiId(e.target.value)}
                id="typeUpiX"
                className="form-control form-control-lg"
              />
            </div>
            <button
              onClick={handlePayment}
              style={{ backgroundColor: "#FF6005", color: "white" }}
              className="btn btn-lg px-5 mt-5"
              type="submit"
              disabled={loading}
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
