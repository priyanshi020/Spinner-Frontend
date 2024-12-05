import React, { useState, useRef } from "react";
import { Wheel } from "react-custom-roulette";
import Modal from "react-modal";
import "./CSS/spinner.css";
// import sound from "../audio/wheel.wav";
import sound from "../audio/spinSound.mp3";
import Navbar from "./Navbar";
import logo from "../Images/tufcon-logo.png";
import confettiGif from "../Images/confetti.gif";
import { useNavigate } from "react-router-dom";
import betterLuckMp4 from "../Images/oops.mp4";
import image1 from "../Images/tigerji.png";
import image2 from "../Images/TMT.png";
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
const segColors = ["#CC0005", "#FDF5EB", "#CC0005", "#FDF5EB", "#CC0005", "#FDF5EB"];

Modal.setAppElement("#root");

function Spinner() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [result, setResult] = useState(""); // To store the result message
  const [spinCount, setSpinCount] = useState(0); // Track the number of spins
  const [showModal, setShowModal] = useState(false); // Modal control
  const spinSound = useRef(new Audio(sound));
  const navigate = useNavigate();

  // const handleSpinClick = () => {
  //   let newPrizeNumber;

  //   // Determine the result based on spin count
  //   if (spinCount < 2) {
  //     // Force "Better luck" for the first two spins
  //     newPrizeNumber = segments.findIndex((segment) => segment.option === "Better luck");
  //   } else {
  //     // Randomly determine a prize for subsequent spins
  //     newPrizeNumber = Math.floor(Math.random() * segments.length);
  //   }

  //   setPrizeNumber(newPrizeNumber);
  //   setMustSpin(true);
  //   setSpinCount(spinCount + 1); // Increment spin count

  //   if (spinSound.current) {
  //     spinSound.current.play();
  //   }

  //   setResult("");
  //   setShowModal(false);
  // };

  const [hasSpun, setHasSpun] = useState(false);

  const handleSpinClick = () => {
    if (hasSpun) {
      alert("You can only spin once.");
      navigate("/");
      return;
    }

    const newPrizeNumber = Math.floor(Math.random() * segments.length);

    // Update states
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);

    if (spinSound.current) {
      spinSound.current.play();
    }

    setResult("");
    setShowModal(false);

    setHasSpun(true);
  };

  const onFinished = (winner) => {
    setResult(winner);
    setShowModal(true);
    setMustSpin(false);

    if (winner.includes("Better luck")) {
      localStorage.setItem("hasSpun", "true");
      console.log("Better luck, spin disabled.");
    } else {
      const prizeAmount = winner.match(/\d+/)?.[0] || "0";
      localStorage.setItem("prizeAmount", prizeAmount);
      console.log(`Prize saved in localStorage: ${prizeAmount}`);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const redirectToForm = () => {
    navigate("/Q&A");
  };

  return (
    <div className="App1" style={{ overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={logo} height={120} width={130} alt="Logo" />
      </div>

      <div className="wheel-container ">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={segments}
          backgroundColors={segColors}
          textColors={["#EDD871"]}
          onStopSpinning={() => onFinished(segments[prizeNumber].option)}
          outerBorderColor="#EDD871"
          outerBorderWidth={18}
          innerRadius={20}
          innerBorderColor="white"
          radiusLineWidth={8}
          radiusLineColor="white"
          fontFamily="Arial"
        />

        <button
          className="spin-button"
          onClick={handleSpinClick}
          disabled={mustSpin}
        >
          Spin
        </button>
      </div>

      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}
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
            zIndex: 9999,
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 9998,
          },
        }}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "transparent",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          ✖
        </button>

        {/* Modal Content */}
        {result.includes("Better luck") ? (
          <video
            src={betterLuckMp4}
            autoPlay
            loop
            muted
            width={300}
            style={{ borderRadius: "10px" }}
          ></video>
        ) : (
          <img
            src={confettiGif}
            alt="Confetti"
            width={300}
            style={{ borderRadius: "10px" }}
          />
        )}
        <h2 style={{ marginTop: "20px", fontSize: "24px", color: "#333" }}>
          {result}
        </h2>
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
      </Modal>

      {/* <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <img
            src={image1}
            alt="First Image"
            style={{
              width: "100%",
              maxWidth: "300px",
              height: "auto",
            }}
          />
        </div>
      </div> */}
    </div>
  );
}

export default Spinner;
