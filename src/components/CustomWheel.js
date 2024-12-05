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

// import React, { useState } from "react";
// import "./CSS/wheel.css";

// const CustomWheel = () => {
//   const prizes = [
//     "🎁 Gift 1",
//     "💰 Prize 2",
//     "🏆 Jackpot",
//     "🎉 Bonus",
//     "🍀 Luck",
//     "🛍️ Surprise",
//     "🎮 Game",
//     "🍔 Food",
//   ];
//   const [selectedPrize, setSelectedPrize] = useState(null);
//   const [spinning, setSpinning] = useState(false);

//   const handleSpin = () => {
//     if (spinning) return;
//     setSpinning(true);

//     const randomIndex = Math.floor(Math.random() * prizes.length);
//     const spinDegrees = 360 * 3 + randomIndex * (360 / prizes.length); // Spin 3 times + land on prize
//     document.documentElement.style.setProperty("--spin-deg", `${spinDegrees}deg`);

//     setTimeout(() => {
//       setSelectedPrize(prizes[randomIndex]);
//       setSpinning(false);
//     }, 3000);
//   };

//   return (
//     <div className="spinner-container">
//       <div className={`spinner ${spinning ? "spinning" : ""}`}>
//         {prizes.map((prize, index) => (
//           <div
//             key={index}
//             className="spinner-segment"
//             style={{ transform: `rotate(${index * (360 / prizes.length)}deg)` }}
//           >
//             <span>{prize}</span>
//           </div>
//         ))}
//         <button className="spin-button" onClick={handleSpin} disabled={spinning}>
//           SPIN
//         </button>
//       </div>
//       {selectedPrize && <div className="prize-display">🎉 {selectedPrize}</div>}
//     </div>
//   );
// };

// export default CustomWheel;


import React, { useState } from 'react';
import './CSS/wheel.css';

const CustomWheel = () => {
  const [clicks, setClicks] = useState(0);
  const [highlight, setHighlight] = useState(null);
  const degree = 1800;

  const spin = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);

    const newDegree = degree * newClicks;
    const extraDegree = Math.floor(Math.random() * 360) + 1;
    const totalDegree = newDegree + extraDegree;

    document.getElementById('inner-wheel').style.transform = `rotate(${totalDegree}deg)`;

    const difficulty = getDifficulty(extraDegree);
    setTimeout(() => {
      setHighlight(difficulty);
    }, 6000);
  };

  const getDifficulty = (ranD) => {
    if (ranD % 180 > 120) {
      return 'easy';
    } else if (ranD % 180 > 60) {
      return 'medium';
    } else {
      return 'hard';
    }
  };

  return (
    <div className="difficulty-container">
      <h1 className="title">Surrender to the Wheel of Fate</h1>
      <div className="hero-div">
        <div className="wheel">
          <div id="inner-wheel">
            {['Easy', 'Medium', 'Hard', 'Easy', 'Medium', 'Hard'].map((level, index) => (
              <div
                className={`sec ${highlight === level.toLowerCase() ? 'highlight' : ''}`}
                key={index}
              >
                <span className={`fa ${level.toLowerCase()}`}>{level}</span>
              </div>
            ))}
          </div>
          <div id="spin">
            <button id="inner-spin" onClick={spin}></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomWheel;
