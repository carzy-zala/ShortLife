import React, { useId } from "react";
import "./Select.css"

function Select() {
  const id = useId();

  const options = [
    "food",
    "health and fitness",
    "travel",
    "movie",
    "education",
  ];

  return (
    <select id={id} className="select-drop-down-box" defaultValue="Select category">
      {options?.map((option) => (
        <option key={option} value={option} className="option">
          {option}
        </option>
      ))}
    </select>
  );
}

export default Select;
