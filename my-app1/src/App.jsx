import React, { useState } from "react";
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
  const rows = 90;
  const columns = 52;

  console.log(secondsAlive);

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
        <tr>hours Alive: {Math.round(hoursAlive * 100)/100}</tr>
        <tr>days Alive: {Math.round(daysAlive * 100)/100}</tr>
        <tr>weeks Alive: {Math.round(weeksAlive * 100)/100}</tr>
        <tr>years Alive: {Math.round(yearsAlive * 100)/100}</tr>
      </table>
      <div style={gridStyle}>{squares}</div>
    </body>
  );
};

export default App;
