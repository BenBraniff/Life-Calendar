import React, { useState } from "react";
import './App.css';

function App() {

  let myBirthday = new Date('2024-12-10');
  
  const rows = 90;
  const columns = 52;
  const targetIndex = 100;

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
        backgroundColor: index <= targetIndex ? "black" : "lightgray",
      }}
    ></div>
  ));

  return (
    <body>
      <h1>Life Calander</h1>
      <h2>by: Ben Braniff</h2>
      <div style={gridStyle}>{squares}</div>
    </body>
  );
};

export default App;
