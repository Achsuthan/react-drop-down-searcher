import React, { useEffect, useState } from "react";
import "./styles/global.css";

const DropdownMultiple = ({
  placeholder = "Search",
  isSingle = false,
  labelName = "title",
  selectedList = [],
  selectedlabelName = "title",
  toggleItem = {},
  list = [],
  inputChanged = {},
  searchKey= ""
}) => {
  const [listOpen, setListOpen] = useState(false);
  const [input, setInput] = useState("");
  const [internalSelectedList, setInternanSelectedList] = useState([]);
  const [internalList, setInternalList] = useState([])

  useEffect(() => {
    let tmpSelectedList = [];
    tmpSelectedList = [...internalSelectedList];
    tmpSelectedList = tmpSelectedList.concat(selectedList);
    if (tmpSelectedList.length > 0) {
      setInternanSelectedList(new Set(tmpSelectedList));
    }
  }, []);

  useEffect(()=>{
    setInternalList(list)
  },[list])

  useEffect(()=>{
    if(searchKey){
      changeListValueBasedOnSearch(searchKey)
      setInput(searchKey)
    }
  },[searchKey])

  const changeListValueBasedOnSearch = (value) => {
    if (value) {
      let tmpArray = []
      list.filter(val => {
        if (val.name.toUpperCase().includes(value.toUpperCase())) {
          tmpArray = [...tmpArray , val]
        }
      })
      setInternalList(tmpArray)
    }
    else {
      setInternalList(list)
    }
  }

  const close = timeOut => {
    setListOpen(false);
    window.removeEventListener("mousedown", close);
  };

  const toggleList = () => {
    setListOpen(!listOpen);
  };

  

  const handleInputChange = evt => {
    let inputValue = evt.target.value
    changeListValueBasedOnSearch(inputValue)
    setListOpen(true);
    setInput(inputValue);
    inputChanged(inputValue);
  };

  const handleRemoveItem = index => {
    return () => {
      let tmpArray = internalSelectedList.filter((item, i) => i !== index);
      setInternanSelectedList(tmpArray);
      toggleItem(tmpArray);
    };
  };

  const dropDownSelectedItem = item => {
    let totalSelectedItem = [...internalSelectedList];
    if (isSingle) {
      totalSelectedItem = [item];
      setInternanSelectedList(totalSelectedItem);
    } else if (!selectedClassname(item)) {
      totalSelectedItem.push(item);
      setInternanSelectedList(totalSelectedItem);
    } else {
      totalSelectedItem.splice(totalSelectedItem.indexOf(item), 1);
      setInternanSelectedList(totalSelectedItem);
    }
    setInput("");
    changeListValueBasedOnSearch("")
    toggleItem(totalSelectedItem);
  };

  const renderDropDownFn = internalList => {
    return (
      <div>
        <ul
          className="dd-list"
          onClick={e => e.stopPropagation()}
          onMouseEnter={() => {
            window.removeEventListener("mousedown", close);
          }}
          onMouseLeave={() => {
            window.addEventListener("mousedown", close);
          }}
        >
          {internalList.map((item, index) => renderDropDownSelectedItem(item, index))}
        </ul>
      </div>
    );
  };

  const selectedClassname = item => {
    return internalSelectedList.some(
      internalList => internalList[labelName].toUpperCase() === item[labelName].toUpperCase()
    );
  };

  const renderDropDownSelectedItem = (item, index) => {
    return (
      <div key={index}>
        <li
          className={
            selectedClassname(item) ? "dd-list-item selected" : "dd-list-item"
          }
          key={index}
          onClick={() => {
            dropDownSelectedItem(item);
          }}
        >
          {item[labelName]}
        </li>
      </div>
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
    <div>
      <div className="col-12">
        <div className="dd-wrapper">
          <div
            className="dd-header"
            onClick={() => toggleList()}
            onMouseEnter={() => {
              window.removeEventListener("mousedown", close);
            }}
            onMouseLeave={() => {
              window.addEventListener("mousedown", close);
            }}
          >
            <label style={{ marginTop: "5px" }}>
              <ul style={styles}>
                {internalSelectedList.map((item, i) => (
                  <li
                    key={i}
                    style={styles.items}
                    onClick={handleRemoveItem(i)}
                  >
                    {item[selectedlabelName]}
                    <span style={{ paddingLeft: "5px", color: "white" }}>
                      X
                    </span>
                  </li>
                ))}

                <input
                  className="col-12 dd-header dd-wrapper"
                  placeholder={placeholder}
                  style={styles.input}
                  value={input}
                  onChange={handleInputChange}
                />
              </ul>
            </label>
          </div>
          {listOpen ? renderDropDownFn(internalList) : null}
        </div>
      </div>
    </div>
  );
};

export default DropdownMultiple;
