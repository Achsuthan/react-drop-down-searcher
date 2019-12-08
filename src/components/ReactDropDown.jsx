import React, { useEffect, useState } from "react";
import "../styles/global.css";

const DropdownMultiple = ({
  headerTitle = "",
  isSingle = false,
  labelName = "title",
  selectedList = [],
  selectedlabelName = "",
  toggleItem = {},
  list = [],
  inputChanged = {}
}) => {

  const [listOpen, setListOpen] = useState(false);
  const [input, setInput] = useState("");

  const close = timeOut => {
    setListOpen(false);
    window.removeEventListener("mousedown", close)
  };

  const toggleList = () => {
    setListOpen(!listOpen);
  };

  const handleInputChange = evt => {
    setListOpen(true);
    setInput(evt.target.value.toUpperCase());
    inputChanged(evt.target.value.toUpperCase());
  };

  const handleRemoveItem = index => {
    return () => {
      toggleItem(selectedList.filter((item, i) => i !== index));
    };
  };

  const renderDropDownFn = list => {
    return (
      <ul className="dd-list" onClick={e => e.stopPropagation()} onMouseEnter ={()=>{
        window.removeEventListener("mousedown", close);
      }}
      onMouseLeave={()=>{
        window.addEventListener("mousedown", close);
      }}>
        {list.map((item, index) => renderDropDownSelectedItem(item, index))}
      </ul>
    );
  };

  const selectedClassname = item => {
    return selectedList.some(list => list[labelName] == item[labelName]);
  };

  const renderDropDownSelectedItem = (item, index) => {
    return (
      <li
        className={
          selectedClassname(item) ? "dd-list-item selected" : "dd-list-item"
        }
        key={index}
        onClick={() => {
          let totalSelectedItem = selectedList;
          isSingle
            ? (totalSelectedItem = [item])
            : !selectedClassname(item)
            ? totalSelectedItem.push(item)
            : totalSelectedItem.splice(totalSelectedItem.indexOf(item), 1);
          setInput("");
          toggleItem(totalSelectedItem);
        }}
      >
        {item[labelName]}
      </li>
    );
  };

  const styles = {
    container: {
      padding: "2px",
      margin: "5px"
    },

    items: {
      color: "white",
      display: "inline-block",
      padding: "2px",
      border: "1px solid #0074D9",
      backgroundColor: "#0074D9",
      borderRadius: "5px",
      margin: "5px",
      cursor: "pointer"
    },

    input: {
      outline: "none",
      border: "none",
      fontSize: "12px"
    }
  };

  return (
    <div className="col-12">
      <div className="dd-wrapper">
        <div className="dd-header" onClick={() => toggleList()} onMouseEnter ={()=>{
        window.removeEventListener("mousedown", close);
      }}
      onMouseLeave={()=>{
        window.addEventListener("mousedown", close);
      }}>
          <label>
            <ul style={styles}>
              {selectedList.map((item, i) => (
                <li key={i} style={styles.items} onClick={handleRemoveItem(i)}>
                  {item[selectedlabelName]}
                  <span style={{ paddingLeft: "5px", color: "white" }}>
                   X
                  </span>
                </li>
              ))}

              <input
                className="form-control dd-header dd-wrapper"
                placeholder={headerTitle}
                style={styles.input}
                value={input}
                onChange={handleInputChange}
              />
            </ul>
          </label>
        </div>
        {listOpen && renderDropDownFn(list)}
      </div>
    </div>
  );
};

export default DropdownMultiple;
