// import React, { useState } from "react";
// import "./CSS/wheel.css"; 
// import wheelImage from "../Images/spinImage.png";
// import pinImage from "../Images/spinPin.png";

// const prizes = ["Prize 1", "Prize 2", "Prize 3", "Prize 4", "Prize 5", "Prize 6","Prize 1", "Prize 2", "Prize 3", "Prize 4", "Prize 5", "Prize 6"];

// const CustomWheel = () => {
//   const [spinning, setSpinning] = useState(false);
//   const [spinAngle, setSpinAngle] = useState(0);
//   const [prize, setPrize] = useState(null); 

//   const startSpin = () => {
//     const segmentAngle = 360 / prizes.length;
//     const randomSpin = Math.floor(Math.random() * 360) + 360 * 3; 
//     const finalAngle = randomSpin % 360;
//     const selectedSegment = Math.floor((360 - finalAngle) / segmentAngle) % prizes.length;

//     setSpinAngle(randomSpin);
//     setSpinning(true);

//     setTimeout(() => {
//       setSpinning(false);
//       setPrize(prizes[selectedSegment]); 
//     }, 3000);
//   };

//   return (
//     <div style={{ position: "relative", width: "300px", height: "300px", textAlign: "center" }}>
//       {/* Wheel Image */}
//       <img
//         src={wheelImage}
//         alt="Wheel"
//         style={{
//           width: "100%",
//           height: "100%",
//           transform: `rotate(${spinning ? spinAngle : 0}deg)`,
//           transition: spinning ? "transform 3s ease-in-out" : "none",
//         }}
//       />

//       {/* Prize Labels */}
//       {prizes.map((prize, index) => {
//         const angle = (360 / prizes.length) * index; // Calculate angle for each prize
//         return (
//           <div
//             key={index}
//             style={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: `rotate(${angle}deg) translate(0, -120px) rotate(-${angle}deg)`,
//               transformOrigin: "center center",
//               textAlign: "center",
//               fontSize: "14px",
//               fontWeight: "bold",
//               color: "#fff",
//               width: "80px",
//             }}
//           >
//             {prize}
//           </div>
//         );
//       })}

//       {/* Pin Image */}
//       <img
//         height={60}
//         width={50}
//         src={pinImage}
//         alt="Pin"
//         style={{
//           position: "absolute",
//           top: "30%",
//           left: "101%",
//           transform: "translate(-50%, -100%)",
//           zIndex: 10,
//         }}
//       />

//       {/* Spin Button */}
//       <button onClick={startSpin} style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}>
//         Spin
//       </button>

//       {/* Prize Message */}
//       {prize && (
//         <div style={{ marginTop: "20px", fontSize: "18px", fontWeight: "bold", color: "#333" }}>
//           🎉 Congratulations! You won: <span style={{ color: "green" }}>{prize}</span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomWheel;

import React, { useRef } from "react";
import "./CSS/wheel.css"; // Import the CSS file for styling
import wheelImage from "../Images/spinImage.png";
import pinImage from "../Images/spinPin.png";
const CustomWheel = () => {
  const wheelRef = useRef(null);
  const buttonRef = useRef(null);
  let deg = 0;

  const handleSpin = () => {
    const wheel = wheelRef.current;
    const button = buttonRef.current;

    // Disable the button during spin
    button.style.pointerEvents = "none";

    // Calculate a new rotation between 5000 and 10,000 degrees
    deg = Math.floor(5000 + Math.random() * 5000);

    // Set the transition on the wheel
    wheel.style.transition = "all 10s ease-out";

    // Rotate the wheel
    wheel.style.transform = `rotate(${deg}deg)`;

    // Apply the blur
    wheel.classList.add("blur");
  };

  const handleTransitionEnd = () => {
    const wheel = wheelRef.current;
    const button = buttonRef.current;

    // Remove the blur
    wheel.classList.remove("blur");

    // Enable the button after the spin
    button.style.pointerEvents = "auto";

    // Reset transition
    wheel.style.transition = "none";

    // Calculate the actual degree on a 360-degree basis
    const actualDeg = deg % 360;

    // Set the real rotation instantly without animation
    wheel.style.transform = `rotate(${actualDeg}deg)`;
  };

  return (
    <div id="app">
      <img className="marker" src={pinImage} alt="Marker" />
      <img
        ref={wheelRef}
        className="wheel"
        src={wheelImage}
        alt="Wheel"
        onTransitionEnd={handleTransitionEnd}
      />
      <img
        ref={buttonRef}
        className="button"
        src={pinImage}
        alt="Spin Button"
        onClick={handleSpin}
      />
    </div>
  );
};

export default CustomWheel;

