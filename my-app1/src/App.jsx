import React, { useState, useEffect } from "react";
import './App.css';

// Function to convert HSV to RGB
function hsvToRgb(h, s, v) {
  let r, g, b;

  let i = Math.floor(h / 60);
  let f = h / 60 - i;
  let p = v * (1 - s);
  let q = v * (1 - f * s);
  let t = v * (1 - (1 - f) * s);

  switch (i % 6) {
      case 0: r = v; g = t; b = p; break;
      case 1: r = q; g = v; b = p; break;
      case 2: r = p; g = v; b = t; break;
      case 3: r = p; g = q; b = v; break;
      case 4: r = t; g = p; b = v; break;
      case 5: r = v; g = p; b = q; break;
  }

  return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
  };
}

// Function to convert RGB to Hex
function rgbToHex(r, g, b) {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

// Function to convert HSV to Hex
function hsvToHex(h, s, v) {
  // Ensure H, S, V are within valid ranges
  h = Math.max(0, Math.min(360, h));
  s = Math.max(0, Math.min(1, s));
  v = Math.max(0, Math.min(1, v));

  const { r, g, b } = hsvToRgb(h, s, v);
  return rgbToHex(r, g, b);
}

function App() {

  let myBirthday = new Date('May 14 2004 00:00:00 GMT-0400');
  let birthdayMillis = Date.parse(myBirthday);


  const [currentTime, setCurrentTime] = useState(      new Date(Date.now()).toString());
  const [currentSeconds, setCurrentSeconds] = useState(Math.round(((Date.now() - birthdayMillis) / (1000))));
  const [currentMinutes, setCurrentMinutes] = useState(Math.round(((Date.now() - birthdayMillis) / (1000*60))*10)/10);
  const [currentHours, setCurrentHours] = useState(    Math.round(((Date.now() - birthdayMillis) / (1000*60*60))*100)/100);
  const [currentDays, setCurrentDays] = useState(      Math.round(((Date.now() - birthdayMillis) / (1000*60*60*24))*100)/100);
  const [currentWeeks, setCurrentWeeks] = useState(    Math.round(((Date.now() - birthdayMillis) / (1000*60*60*24*7))*100)/100);
  const [currentYears, setCurrentYears] = useState(    Math.round(((Date.now() - birthdayMillis) / (1000*60*60*24*365))*100)/100);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(   new Date(Date.now()).toString());
      setCurrentSeconds(Math.round(((Date.now() - birthdayMillis) / (1000))));
      setCurrentMinutes(Math.round(((Date.now() - birthdayMillis) / (1000*60))*10)/10);
      setCurrentHours(  Math.round(((Date.now() - birthdayMillis) / (1000*60*60))*100)/100);
      setCurrentDays(   Math.round(((Date.now() - birthdayMillis) / (1000*60*60*24))*100)/100);
      setCurrentWeeks(  Math.round(((Date.now() - birthdayMillis) / (1000*60*60*24*7))*100)/100);
      setCurrentYears(  Math.round(((Date.now() - birthdayMillis) / (1000*60*60*24*365))*100)/100);
    }, 1000); // Update every second
    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  const [colorWaysSelect, setcolorWaysSelect] = useState("0");
  // colorWaysSelect.addEventListener('change', () => {
  //     selectedValue = colorWaysSelect.value;
  // });

  const rows = 90;
  const columns = 52;

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2px",
    margin: "30px"
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `auto repeat(${columns}, 10px)`, // Extra column for row labels
    gap: "2px", // Optional spacing
    justifyContent: "center", // Horizontally center the grid
  };

  const labelsRowStyle = {
    display: "grid",
    gridTemplateColumns: `auto repeat(${columns}, 15px)`, // Extra column for the labels
    gap: "2px",
    marginLeft: "20px"
  };

  const columnLabels = Array.from({ length: columns }, (_, index) => (
    <div key={index} style={{ textAlign: "center", fontSize: "10px" }}>
      {index + 1}
    </div>
  ));

  const squareStyle = (theIndex) => {
    let theColor = "lightgray";
    let choice = parseInt(colorWaysSelect, 10);
    switch (choice) {
      case 0: {
        let isColored = 0;
        if (theIndex < currentWeeks) {
          isColored = 0;
        } else if (theIndex == Math.round(currentWeeks)) {
          isColored = 1;
        } else {
          isColored = 2;
        }
        switch (isColored) {
          case 0:
            theColor = "black";
            break;
          case 1:
            theColor = "green";
            break;
          case 2:
            theColor = "lightgray";
            break;
          default:
            theColor = "lightgray";
        }
        break;
      }
      case 1: {
        let isColored = 0;
        if (theIndex < currentWeeks) {
          theColor = hsvToHex( theIndex / currentWeeks * 360, 1, 1);
        } else if (theIndex == Math.round(currentWeeks)) {
          theColor = "white";
        } else {
          isColored = "lightgray";
        }
        break;
      }
      case 2: {
        // 90 * 52 = 4,680 (total number of squares)
        let isColored = 0;
        if (theIndex < currentWeeks) {
          theColor = hsvToHex( theIndex / 4680 * 360, 1, 1);
        } else if (theIndex == Math.round(currentWeeks)) {
          theColor = "black";
        } else {
          isColored = "lightgray";
        }
        break;
      }
    }
    return {
      width: "15px",
      height: "15px",
      backgroundColor: theColor,
    };
  };
  

  const squares = Array.from({ length: rows * columns }, (_, index) => {
    return <div key={index} style={squareStyle(index)}></div>;
  });

  const gridWithRowLabels = Array.from({ length: rows }, (_, rowIndex) => (
    <div key={rowIndex} style={{ display: "flex", alignItems: "center" }}>
      <div style={{ width: "20px", textAlign: "center", fontSize: "10px" }}>
        {rowIndex}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 15px)`,
          gap: "2px",
        }}
      >
        {squares.slice(rowIndex * columns, (rowIndex + 1) * columns)}
      </div>
    </div>
  ));

  return (
      <div>
      <h1>Life Calander</h1>
      <h2>by: Ben Braniff</h2>
      <table>
        <tbody>
        <tr><td>Birthday: </td><td>{myBirthday.toString()}</td></tr>
        <tr><td>Current Time:</td><td> {currentTime}</td></tr>
        <tr><td>Seconds Alive: </td><td>{currentSeconds}</td></tr>
        <tr><td>Minutes Alive: </td><td>{currentMinutes}</td></tr>
        <tr><td>Hours Alive: </td><td>{currentHours}</td></tr>
        <tr><td>Days Alive: </td><td>{currentDays}</td></tr>
        <tr><td>Weeks Alive: </td><td>{currentWeeks}</td></tr>
        <tr><td>Years Alive: </td><td>{currentYears}</td></tr>
        <tr><td>Color Way: </td>
            <td><select
            name="colorWays"
            id="colorWays"
            value={colorWaysSelect}
            onChange={(e) => setcolorWaysSelect(e.target.value)}>
                  <option value="0">Basic</option>
                  <option value="1">Full Rainbow</option>
                  <option value="2">Part Rainbow</option>
                </select></td></tr>
        </tbody>
      </table>
      <div style={containerStyle}>
        {/* Column labels */}
        <div style={labelsRowStyle}>
          <div></div> {/* Empty space for alignment */}
          {columnLabels}
        </div>
        {/* Grid with row labels */}
        {gridWithRowLabels}
      </div>
      </div>
  );
};

  export default App;