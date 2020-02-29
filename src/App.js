import React, { useState } from "react";
import "./App.css";
import ReactDropDown from "./components/ReactDropDown";

function App() {
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

  const [singleSearchKey, setSingleSearchKey] = useState("");
  const [singleSelectedValue, setSingleSelectedValue] = useState([]);
  const [multiSearchKey, setMultiSearchKey] = useState("");
  const [multiSelectedValue, setMultiSelectedValue] = useState([]);
  const toggleItem = (val, isSingle) => {
    if (isSingle) {
      setSingleSelectedValue(val);
    } else {
      setMultiSelectedValue(val);
    }
  };
  const handleInputChange = (val, isSingle) => {
    if (isSingle) {
      setSingleSearchKey(val);
    } else {
      setMultiSearchKey(val);
    }
  };

  const setUpSingleSelectedItem = () => {
    return singleSelectedValue.map((val, index)=>(
      <div key={index}>
        {index + 1} . {val.name}
      </div>
    ))
  };

  const setUpMultipleSelectedItem = () => {
    return multiSelectedValue.map((val, index)=>(
      <div key={index}>
        {index + 1} {val.name}
      </div>
    ))
  };

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
          selectedList={singleSelectedValue}
          selectedlabelName="name"
          toggleItem={val => toggleItem(val, true)}
          inputChanged={val => handleInputChange(val, true)}
          searchKey={singleSearchKey}
        />
        <span>Searched Key : {singleSearchKey}</span>
        <br />
        {setUpSingleSelectedItem()}
        <br />
        <br />
        <br />

        <p>Multi Select Dropdown</p>
        <ReactDropDown
          placeholder="Dropdown..."
          isSingle={false}
          list={list}
          labelName="name"
          selectedList={multiSelectedValue}
          selectedlabelName="name"
          toggleItem={val => toggleItem(val, false)}
          inputChanged={val => handleInputChange(val, false)}
          searchKey={multiSearchKey}
        />
        <span>Searched Key : {multiSearchKey}</span>
        <br/>
        {setUpMultipleSelectedItem()}
      </div>
    </div>
  );
}

export default App;
