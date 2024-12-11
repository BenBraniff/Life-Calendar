  import React, { useState, useEffect } from "react";
  import './App.css';

  function App() {

    let myBirthday = new Date('May 14, 2004 00:00:00');
    let birthdayMillis = Date.parse(myBirthday);

    const [currentTime, setCurrentTime] = useState(      new Date(Date.now()).toString());
    const [currentSeconds, setCurrentSeconds] = useState(Math.round(((Date.now() - birthdayMillis) / (1000))));
    const [currentMinutes, setCurrentMinutes] = useState(Math.round(((Date.now() - birthdayMillis) / (1000*60))));
    const [currentHours, setCurrentHours] = useState(    Math.round(((Date.now() - birthdayMillis) / (1000*60*60))*100)/100);
    const [currentDays, setCurrentDays] = useState(      Math.round(((Date.now() - birthdayMillis) / (1000*60*60*24))*100)/100);
    const [currentWeeks, setCurrentWeeks] = useState(    Math.round(((Date.now() - birthdayMillis) / (1000*60*60*24*7))*100)/100);
    const [currentYears, setCurrentYears] = useState(    Math.round(((Date.now() - birthdayMillis) / (1000*60*60*24*365))*100)/100);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(   new Date(Date.now()).toString());
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

    const columnLabels = Array.from({ length: columns }, (_, index) => (
      <div key={index} style={{ textAlign: "center", fontSize: "10px" }}>
        {index + 1}
      </div>
    ));

    const squareStyle = (whatColor) => {
      let theColor;
      switch (whatColor) {
        case 0:
          theColor = "black";
          break;
        case 1:
          theColor = "lightgray";
          break;
        case 2:
          theColor = "green";
          break;
        default:
          theColor = "transparent";
      }
      return {
        width: "15px",
        height: "15px",
        backgroundColor: theColor,
      };
    };
    

    const squares = Array.from({ length: rows * columns }, (_, index) => {
      let isColored = 0; // Use let instead of const
      if (index < currentWeeks) {
        isColored = 0;
      } else if (index == Math.round(currentWeeks)) {
        isColored = 2;
      } else {
        isColored = 1;
      }
      return <div key={index} style={squareStyle(isColored)}></div>;
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
          <tr><td>Current:</td><td> {currentTime}</td></tr>
          <tr><td>Seconds Alive: </td><td>{currentSeconds}</td></tr>
          <tr><td>Minutes Alive: </td><td>{currentMinutes}</td></tr>
          <tr><td>Hours Alive: </td><td>{currentHours}</td></tr>
          <tr><td>Days Alive: </td><td>{currentDays}</td></tr>
          <tr><td>Weeks Alive: </td><td>{currentWeeks}</td></tr>
          <tr><td>Years Alive: </td><td>{currentYears}</td></tr>
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