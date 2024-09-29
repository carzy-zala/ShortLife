import React, { useId } from "react";
import "./Select.css";
import { useSelector } from "react-redux";

function Select() {
  const [_, ...allOptions] = useSelector(
    (store) => store.categories.categories
  );
  const options = [{ text: "Select Category" }, ...allOptions] || [];

  return (
    <select className="select-drop-down-box" defaultValue="Select category">
      {options.map((option) => (
        <option
          key={option.text}
          id={option.text}
          value={option.text}
          className="option"
        >
          {option.text}
        </option>
      ))}
    </select>
  );
}

export default Select;
