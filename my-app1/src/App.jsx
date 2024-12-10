import React, { useState, useEffect } from "react";
import './App.css';

function App() {

  let myBirthday = new Date('May 14, 2004 00:00:00');
  let birthdayMillis = Date.parse(myBirthday);
  const currentTimeMillis = Date.now();
  const secondsAlive = (currentTimeMillis - birthdayMillis) / (1000);
  const minutesAlive = secondsAlive / 60;
  const hoursAlive = minutesAlive / 60;
  const daysAlive = hoursAlive / 24;
  const weeksAlive = daysAlive / 7;
  const yearsAlive = daysAlive / 365;

  const [currentTime, setCurrentTime] = useState(new Date(Date.now()).toString());
  const [currentSeconds, setCurrentSeconds] = useState(Math.round(secondsAlive));
  const [currentMinutes, setCurrentMinutes] = useState(Math.round(minutesAlive));
  const [currentHours, setCurrentHours] = useState(Math.round(hoursAlive*100)/100);
  const [currentDays, setCurrentDays] = useState(Math.round(daysAlive*100)/100);
  const [currentWeeks, setCurrentWeeks] = useState(Math.round(weeksAlive*100)/100);
  const [currentYears, setCurrentYears] = useState(Math.round(yearsAlive*100)/100);

  const [coloredSquare, setColoredSquare] = useState({ row: 5, col: 10 });


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date(Date.now()).toString());
      setCurrentSeconds(Math.round(((Date.now() - birthdayMillis) / (1000))));
      setCurrentMinutes(Math.round(((Date.now() - birthdayMillis) / (1000*60))));
      setCurrentHours(  Math.round(((Date.now() - birthdayMillis) / (1000*60*60))*100)/100);
      setCurrentDays(   Math.round(((Date.now() - birthdayMillis) / (1000*60*60*24))*100)/100);
      setCurrentWeeks(  Math.round(((Date.now() - birthdayMillis) / (1000*60*60*24*7))*100)/100);
      setCurrentYears(  Math.round(((Date.now() - birthdayMillis) / (1000*60*60*24*365))*100)/100);
    }, 1000); // Update every second
    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

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

  const squareStyle = (isColored) => ({
    width: "15px",
    height: "15px",
    backgroundColor: isColored ? "black" : "lightgray",
  });

  const columnLabels = Array.from({ length: columns }, (_, index) => (
    <div key={index} style={{ textAlign: "center", fontSize: "10px" }}>
      {index + 1}
    </div>
  ));

  const squares = Array.from({ length: rows * columns }, (_, index) => {
    // const row = Math.floor(index / columns);
    // const col = index % columns;
    const coloredBlack = index < currentWeeks;
    return (
      <div key={index} style={squareStyle(coloredBlack)}></div>
    );
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
    <body>
      <h1>Life Calander</h1>
      <h2>by: Ben Braniff</h2>
      <table>
        <tr>Birthday: {myBirthday.toString()}</tr>
        <tr>Current : {currentTime}</tr>
        <tr>Seconds Alive : {currentSeconds}</tr>
        <tr>Minutes Alive : {currentMinutes}</tr>
        <tr>Hours Alive: {currentHours}</tr>
        <tr>Days Alive: {currentDays}</tr>
        <tr>Weeks Alive: {currentWeeks}</tr>
        <tr>Years Alive: {currentYears}</tr>
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
    </body>
  );
};

export default App;
