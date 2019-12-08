import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import ReactDropDown from "./components/ReactDropDown";

function App() {
  const [selectedItem, setSelectedItem] = useState([]);
  const list = [
    {
      name: "End Game",
      value: "End Game1"
    },
    {
      name: "The Lion King",
      value: "The Lion King"
    },
    {
      name: "Spider-Man: Far From Home",
      value: "Spider-Man: Far From Home"
    },
    {
      name: "Captain Marvel",
      value: "Captain Marvel"
    },
    {
      name: "Jorker",
      value: "Jorker"
    }
  ];
  const toggleItem = val => {
    setSelectedItem(val);
  };
  const handleInputChange = val => {};

  return (
    <div className="container">
      <br />
      <br />
      <br />
      <div>
        <p>Single Select Dropdown</p>
        <ReactDropDown
          placeholder="Dropdown..."
          isSingle={true}
          list={list}
          labelName="name"
          selectedList={selectedItem}
          selectedlabelName="name"
          toggleItem={val => toggleItem(val)}
          handleInputChange={val => handleInputChange(val)}
        />

        <p>Multi Select Dropdown</p>
        <ReactDropDown
          placeholder="Dropdown..."
          isSingle={true}
          list={list}
          labelName="name"
          selectedList={selectedItem}
          selectedlabelName="name"
          toggleItem={val => toggleItem(val)}
          handleInputChange={val => handleInputChange(val)}
        />
      </div>
    </div>
  );
}

export default App;
