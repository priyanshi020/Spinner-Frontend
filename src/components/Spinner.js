import React, { useState ,useRef} from 'react';
import { Wheel } from 'react-custom-roulette';
import './CSS/spinner.css'
import sound from '../audio/wheel.wav'
import Navbar from './Navbar';
const segments = [
  { option: 'Better luck ' },
  { option: 'won 70 Rs.' },
  { option: 'won 10 Rs.' },
  { option: 'Better luck' },
  { option: 'won 30 Rs.' },
  { option: 'won 40 Rs.' },
  { option: 'Better luck' }, 
  { option: 'won 20 Rs.' },
];
const segColors = ['#EE4040', '#F0CF50', '#815CD1', '#3DA5E0', '#34A24F'];

function Spinner() {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
  
    // Create a reference for the spin sound (assuming it's in the public folder)
    const spinSound = useRef(new Audio(sound)); // Replace with your actual file name and extension
    
    // Handle spin button click
    const handleSpinClick = () => {
      const newPrizeNumber = Math.floor(Math.random() * segments.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      
      // Play the spin sound when the button is clicked and the wheel starts spinning
      if (spinSound.current) {
        spinSound.current.play();
      }
    };
  
    const onFinished = (winner) => {
      console.log(winner);
      setMustSpin(false);
    };
  return (
    <div className="App">
     
      <div className="wheel-container">
      <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={segments}
          backgroundColors={segColors}
          textColors={['#ffffff']}
          onStopSpinning={() => onFinished(segments[prizeNumber].option)}
          outerBorderColor="black"
          outerBorderWidth={8}
          innerRadius={20}
          innerBorderColor="white"
          radiusLineWidth={8}
          radiusLineColor="white"
          fontFamily="Arial"
        />
        <button className="spin-button" onClick={handleSpinClick}>
          Spin
        </button>
      </div>
      <h2>Start Spin see some magic happen!</h2>
    </div>
  );
}

export default Spinner;
