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

  const gridStyle = {
    justifyContent: "center",
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 10px)`,
    gap: "2px",
    margin: "30px"
  };

  const squares = Array.from({ length: rows * columns }, (_, index) => (
    <div
      key={index}
      style={{
        width: "10px",
        height: "10px",
        backgroundColor: index <= weeksAlive ? "black" : "lightgray",
      }}
    ></div>
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
      <div style={gridStyle}>{squares}</div>
    </body>
  );
};

export default App;
