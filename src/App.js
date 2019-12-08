import React, {useState} from "react";
import logo from "./logo.svg";
import "./App.css";
import ReactDropDown from "./components/ReactDropDown";

function App() {
  const [selectedItem, setSelectedItem] = useState([])
  const list = [
    {
      name: "Testing 1",
      value: "Testing 1"
    },
    {
      name: "Testing 2",
      value: "Testing 2"
    },
    {
      name: "Testing 3",
      value: "Testing 3"
    }
  ];
  const toggleItem =(val)=>{
    setSelectedItem(val)
  }

  return (
    <div>
      <div className="col-6">
        <ReactDropDown placeholder="Type..." isSingle={false} list={list} labelName="name" selectedList ={selectedItem} selectedlabelName="name" toggleItem={(val)=> toggleItem(val)}/>
      </div>
    </div>
  );
}

export default App;
