import React, { useState } from "react";
import "./CSS/wheel.css"; 
import wheelImage from "../Images/spinImage.png";
import pinImage from "../Images/spinPin.png";

const prizes = ["Prize 1", "Prize 2", "Prize 3", "Prize 4", "Prize 5", "Prize 6","Prize 1", "Prize 2", "Prize 3", "Prize 4", "Prize 5", "Prize 6"];

const CustomWheel = () => {
  const [spinning, setSpinning] = useState(false);
  const [spinAngle, setSpinAngle] = useState(0);
  const [prize, setPrize] = useState(null); 

  const startSpin = () => {
    const segmentAngle = 360 / prizes.length;
    const randomSpin = Math.floor(Math.random() * 360) + 360 * 3; 
    const finalAngle = randomSpin % 360;
    const selectedSegment = Math.floor((360 - finalAngle) / segmentAngle) % prizes.length;

    setSpinAngle(randomSpin);
    setSpinning(true);

    setTimeout(() => {
      setSpinning(false);
      setPrize(prizes[selectedSegment]); 
    }, 3000);
  };

  return (
    <div style={{ position: "relative", width: "300px", height: "300px", textAlign: "center" }}>
      {/* Wheel Image */}
      <img
        src={wheelImage}
        alt="Wheel"
        style={{
          width: "100%",
          height: "100%",
          transform: `rotate(${spinning ? spinAngle : 0}deg)`,
          transition: spinning ? "transform 3s ease-in-out" : "none",
        }}
      />

      {/* Prize Labels */}
      {prizes.map((prize, index) => {
        const angle = (360 / prizes.length) * index; // Calculate angle for each prize
        return (
          <div
            key={index}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `rotate(${angle}deg) translate(0, -120px) rotate(-${angle}deg)`,
              transformOrigin: "center center",
              textAlign: "center",
              fontSize: "14px",
              fontWeight: "bold",
              color: "#fff",
              width: "80px",
            }}
          >
            {prize}
          </div>
        );
      })}

      {/* Pin Image */}
      <img
        height={60}
        width={50}
        src={pinImage}
        alt="Pin"
        style={{
          position: "absolute",
          top: "30%",
          left: "101%",
          transform: "translate(-50%, -100%)",
          zIndex: 10,
        }}
      />

      {/* Spin Button */}
      <button onClick={startSpin} style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}>
        Spin
      </button>

      {/* Prize Message */}
      {prize && (
        <div style={{ marginTop: "20px", fontSize: "18px", fontWeight: "bold", color: "#333" }}>
          🎉 Congratulations! You won: <span style={{ color: "green" }}>{prize}</span>
        </div>
      )}
    </div>
  );
};

export default CustomWheel;
