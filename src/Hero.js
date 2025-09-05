import React, { useEffect, useState } from 'react';
import './Her.css';
import NavigationBar from './NavigationBar';

export default function Hero() {
  const [displayText, setDisplayText] = useState(""); // State to hold the displayed text
  const name = "Ankush Dhull"; // The name to display
  const [index, setIndex] = useState(0); // Index for the current character

  useEffect(() => {
    const interval = setInterval(() => {
      if (index < name.length) {
        setDisplayText((prev) => prev + name[index]); // Add the next character
        setIndex((prev) => prev + 1); // Move to the next character
      } else {
        setDisplayText(''); // Clear text after complete display
        setIndex(0); // Reset index to start over
      }
    }, 500); // Typing speed

    return () => clearInterval(interval); // Clear interval on unmount
  }, [index, name]); // Dependency array to rerun effect on index or name change

  return (
    <div className="hero">
      <NavigationBar/>
      <div className='herocontent'>
      <div className="big-left">
        <p>Hi, This is</p>
        <h1 id="redname">{displayText}</h1>
        <h1>FULL STACK WEB DEVELOPER</h1>
        <button>Know More</button>
        <div className="socialLogos">
          <img src="linkedin.png" alt="LinkedIn" />
          <img src="github.png" alt="GitHub" />
          <img src="fb.png" alt="Facebook" />
          <img src="insta.png" alt="Instagram" />
          <img src="x.png" alt="X" />
        </div>
      </div>
      <div className='bigright'>
        <img src='/file.png' alt='right'/>
      </div>
      </div>
      
    </div>
  );
}
