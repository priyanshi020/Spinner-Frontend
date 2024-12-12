import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GoogleReviewPage = () => {
  const [reviewConfirmed, setReviewConfirmed] = useState(false);
  const navigate = useNavigate();

  const handleRedirectToReview = () => {
    // Open Google Review page
    window.open("https://g.page/r/CODE_FOR_YOUR_BUSINESS/review", "_blank");
  };

  const handleReviewConfirmation = () => {
    // Set review as confirmed
    setReviewConfirmed(true);
  };

  const handleProceed = () => {
    // Navigate to the next page
    if (reviewConfirmed) {
      navigate("/thank-you"); // Replace with your desired route
    } else {
      alert("Please confirm that you have submitted your review.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>We Value Your Feedback!</h2>
      <p style={styles.text}>
        Please take a moment to leave a review for our company. Your feedback helps us improve.
      </p>
      <button style={styles.reviewButton} onClick={handleRedirectToReview}>
        Leave a Google Review
      </button>
      <p style={styles.text}>
        Once you've completed your review, click the checkbox below and proceed.
      </p>
      <div style={styles.confirmation}>
        <input
          type="checkbox"
          id="reviewConfirm"
          onChange={handleReviewConfirmation}
        />
        <label htmlFor="reviewConfirm" style={styles.label}>
          I have submitted my review.
        </label>
      </div>
      <button style={styles.proceedButton} onClick={handleProceed}>
        Proceed
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "10px",
  },
  text: {
    fontSize: "16px",
    marginBottom: "20px",
  },
  reviewButton: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#4285F4",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  confirmation: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
  },
  label: {
    marginLeft: "10px",
    fontSize: "14px",
  },
  proceedButton: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#34A853",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default GoogleReviewPage;
