import React, { useState, useRef } from "react";
import "./CSS/wheel.css"; // Import the CSS file for styling

const CustomWheel = () => {
  const [clicks, setClicks] = useState(0);
  const [prize, setPrize] = useState(null);
  const wheelRef = useRef(null);
  const prizes = [
    "Prize 1", "Prize 2", "Prize 3", "Prize 4",
    "Prize 5", "Prize 6", "Prize 7", "Prize 8"
  ];

  const handleSpinClick = () => {
    const baseDegree = 1800; // Fixed rotations (5 full spins)
    const sectionDegree = 360 / prizes.length; // Size of each segment
    const newClicks = clicks + 1;
    const extraDegree = Math.floor(Math.random() * 360); // Random stop within a single spin
    const totalDegree = baseDegree * newClicks + extraDegree;

    setClicks(newClicks);

    // Rotate the wheel
    if (wheelRef.current) {
      wheelRef.current.style.transition = "transform 3s ease-out";
      wheelRef.current.style.transform = `rotate(${totalDegree}deg)`;

      // Determine prize based on the final stop position
      const finalAngle = totalDegree % 360; // Angle within a single rotation

      // Adjust the angle to control alignment:
      const offset = sectionDegree / 2; // Adjust alignment (center/top/right)
      const adjustedAngle = (360 - finalAngle + offset) % 360;
      const prizeIndex = Math.floor(adjustedAngle / sectionDegree);

      // Set the prize after animation
      setTimeout(() => {
        setPrize(prizes[prizeIndex]);
      }, 3000); // Matches the animation duration
    }
  };

  return (
    <div id="wrapper">
      <div id="pin"></div>
      <div id="wheel">
        <div id="inner-wheel" ref={wheelRef}>
          {prizes.map((prize, index) => (
            <div className="sec" key={index} style={{ transform: `rotate(${index * (360 / prizes.length)}deg)` }}>
              <span className="prize-text">{prize}</span>
            </div>
          ))}
        </div>
        <div id="spin" onClick={handleSpinClick}></div>
      </div>
      <div id="txt">{prize ? `You won: ${prize}` : "Click the spin button!"}</div>
    </div>
  );
};

export default CustomWheel;
