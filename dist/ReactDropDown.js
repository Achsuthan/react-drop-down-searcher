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
  inputChanged = {}
}) => {
  const [listOpen, setListOpen] = useState(false);
  const [input, setInput] = useState("");
  const [internalSelectedList, setInternanSelectedList] = useState([]);
  useEffect(() => {
    let tmpSelectedList = [];
    tmpSelectedList = [...internalSelectedList];
    tmpSelectedList = tmpSelectedList.concat(selectedList);

    if (tmpSelectedList.length > 0) {
      setInternanSelectedList(new Set(tmpSelectedList));
    }
  }, []);

  const close = timeOut => {
    setListOpen(false);
    window.removeEventListener("mousedown", close);
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
    toggleItem(totalSelectedItem);
  };

  const renderDropDownFn = list => {
    return React.createElement("div", null, React.createElement("ul", {
      className: "dd-list",
      onClick: e => e.stopPropagation(),
      onMouseEnter: () => {
        window.removeEventListener("mousedown", close);
      },
      onMouseLeave: () => {
        window.addEventListener("mousedown", close);
      }
    }, list.map((item, index) => renderDropDownSelectedItem(item, index))));
  };

  const selectedClassname = item => {
    return internalSelectedList.some(list => list[labelName] == item[labelName]);
  };

  const renderDropDownSelectedItem = (item, index) => {
    return React.createElement("div", null, React.createElement("li", {
      className: selectedClassname(item) ? "dd-list-item selected" : "dd-list-item",
      key: index,
      onClick: () => {
        dropDownSelectedItem(item);
      }
    }, item[labelName]));
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
  return React.createElement("div", null, React.createElement("div", {
    className: "col-12"
  }, React.createElement("div", {
    className: "dd-wrapper"
  }, React.createElement("div", {
    className: "dd-header",
    onClick: () => toggleList(),
    onMouseEnter: () => {
      window.removeEventListener("mousedown", close);
    },
    onMouseLeave: () => {
      window.addEventListener("mousedown", close);
    }
  }, React.createElement("label", {
    style: {
      marginTop: "5px"
    }
  }, React.createElement("ul", {
    style: styles
  }, internalSelectedList.map((item, i) => React.createElement("li", {
    key: i,
    style: styles.items,
    onClick: handleRemoveItem(i)
  }, item[selectedlabelName], React.createElement("span", {
    style: {
      paddingLeft: "5px",
      color: "white"
    }
  }, "X"))), React.createElement("input", {
    className: "col-12 dd-header dd-wrapper",
    placeholder: placeholder,
    style: styles.input,
    value: input,
    onChange: handleInputChange
  })))), listOpen ? renderDropDownFn(list) : null)));
};

export default DropdownMultiple;