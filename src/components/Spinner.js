import React, { useState, useRef, useEffect } from "react";
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
import customPin from "../Images/aerow.png";
import { API_URL } from "../service";
const segments = [
  { option: "Better luck" },
  { option: "₹ 18/-" },
  { option: "₹ 10/-" },
  { option: "Better luck" },
  { option: "₹ 15/-" },
  { option: "₹ 20/-" },
  { option: "Better luck" },
  { option: "₹ 12/-" },
];
const segColors = [
  "#99031E",
  "#033E8A",
  "#5F1040",
  "#007F5E",
  "#99031E",
  "#033E8A",
  "#5F1040",
  "#007F5E",
];

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

  const handleSpinClick = async () => {
    if (hasSpun) {
        alert("You can only spin once.");
        navigate("/");
        return;
    }

    try {
        const response = await fetch(`${API_URL}api/spin`, { method: "POST" });
        const data = await response.json();
        const resultText = data.result || "Better luck"; // Default to Better Luck if API fails

        const newPrizeNumber = segments.findIndex((segment) => segment.option === resultText);
        setPrizeNumber(newPrizeNumber !== -1 ? newPrizeNumber : 0);
        setMustSpin(true);
        setResult("");

        if (spinSound.current) spinSound.current.play();
        setHasSpun(true);
    } catch (error) {
        console.error("Error fetching spin result:", error);
        alert("Something went wrong. Try again later.");
    }
};

const onFinished = () => {
    const winner = segments[prizeNumber].option;
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
  const [styles, setStyles] = useState({
    top: "10%",
    left: "88%",
  });

   useEffect(() => {
    const updateStyles = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 400) {
        setStyles({
          top: "0vh",
          left: "65%",
        });
      } else if (screenWidth >= 400 && screenWidth <= 480) {
        // Small mobile screens
        setStyles({
          top: "10%",
          left: "80%",
        });
      } else if (screenWidth >= 480 && screenWidth <= 768) {
        // Medium mobile screens
        setStyles({
          top: "10%",
          left: "80%",
        });
      } else {
        // Default for larger screens
        setStyles({
          top: "10%",
          left: "55%",
        });
      }
    };

    // Initial call and event listener
    updateStyles();
    window.addEventListener("resize", updateStyles);

    return () => window.removeEventListener("resize", updateStyles); // Cleanup
  }, []);

  return (
    <div className="App1" style={{ overflow: "hidden" }}>
      <div
        className="my-3"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <img src={logo} alt="Logo" width={200} />
      </div>

      <div className="wheel-container" style={{ position: "relative" }}>
        {/* Custom Pin Image */}
        <img
          src={customPin}
          alt="Custom Pin"
          style={{
            position: "absolute",
            top: styles.top,
            left: styles.left,
            transform: "rotate(45deg)",
            width: "45px",
            height: "45px",
            zIndex: 10,
          }}
        />

        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={segments}
          backgroundColors={segColors}
          textColors={["white"]}
          onStopSpinning={() => onFinished(segments[prizeNumber].option)}
          outerBorderColor="white"
          outerBorderWidth={20}
          innerRadius={20}
          innerBorderColor="#FB6909"
          radiusLineWidth={6}
          radiusLineColor="white"
          fontFamily="Arial"
          pointerProps={{
            style: { display: "none" }, // Hides the default pin
          }}
        />

        <button
          className="spin-button"
          onClick={handleSpinClick}
          disabled={mustSpin}
        >
          SPIN
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
          {result.toLowerCase().includes("better luck")
            ? "Better Luck"
            : `YOU WON ${result}`}
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
