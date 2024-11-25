import React, { useState, useRef } from "react";
import { Wheel } from "react-custom-roulette";
import Modal from "react-modal"; // Import the modal component
import "./CSS/spinner.css";
import sound from "../audio/wheel.wav";
import Navbar from "./Navbar";
import logo from "../Images/tufcon-logo.png";
import confettiGif from "../Images/confetti.gif"; // Replace with a spinning confetti GIF
import { useNavigate } from "react-router-dom";

const segments = [
  { option: "Better luck" },
  { option: "Won 70 Rs." },
  { option: "Won 10 Rs." },
  { option: "Better luck" },
  { option: "Won 30 Rs." },
  { option: "Won 40 Rs." },
  { option: "Better luck" },
  { option: "Won 20 Rs." },
];
const segColors = ["#EE4040", "#F0CF50", "#815CD1", "#3DA5E0", "#34A24F"];

Modal.setAppElement("#root"); // Set the root element for accessibility

function Spinner() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [result, setResult] = useState(""); // To store the result message
  const [showModal, setShowModal] = useState(false); // Modal control
  const spinSound = useRef(new Audio(sound));
  const navigate = useNavigate();

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * segments.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);

    if (spinSound.current) {
      spinSound.current.play();
    }

    setResult("");
    setShowModal(false);
  };

  const onFinished = (winner) => {
    setResult(winner);
    setShowModal(true);
    setMustSpin(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const redirectToForm = () => {
    navigate("/Q&A"); // Replace with your form route
  };

  return (
    <div className="App">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={logo} height={120} width={120} alt="Logo" />
      </div>

      <div className="wheel-container pt-3">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={segments}
          backgroundColors={segColors}
          textColors={["#ffffff"]}
          onStopSpinning={() => onFinished(segments[prizeNumber].option)}
          outerBorderColor="black"
          outerBorderWidth={8}
          innerRadius={20}
          innerBorderColor="white"
          radiusLineWidth={8}
          radiusLineColor="white"
          fontFamily="Arial"
        />

        <button className="spin-button" onClick={handleSpinClick} disabled={mustSpin}>
          Spin
        </button>
      </div>

      <Modal
  isOpen={showModal}
  onRequestClose={closeModal}
  style={{
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      width: "400px",
      textAlign: "center",
      padding: "20px",
      borderRadius: "10px",
      border: "none",
      background: "#f8f8f8",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      zIndex: 9999, // Ensure this is above the spinner
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: 9998, // Slightly lower than content
    },
  }}
>
  <img src={confettiGif} alt="Confetti" width={300} />
  <h2 style={{ marginTop: "20px", fontSize: "24px", color: "#333" }}>{result}</h2>
  {!result.includes("Better luck") && (
    <button
      onClick={redirectToForm}
      style={{
        marginTop: "20px",
        background: "#34A24F",
        color: "#fff",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Claim Your Prize
    </button>
  )}
  {/* <button
    onClick={closeModal}
    style={{
      marginTop: "10px",
      background: "#ccc",
      color: "#000",
      border: "none",
      padding: "8px 15px",
      borderRadius: "5px",
      cursor: "pointer",
    }}
  >
    Close
  </button> */}
</Modal>


      {!showModal && <h2 className="text-center mt-5">Start Spin to see the magic happen!</h2>}
    </div>
  );
}

export default Spinner;
