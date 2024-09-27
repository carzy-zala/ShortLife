import React from "react";
import "./Loader.css";

function Loader({ backgroundColor = "" }) {
  return (
    <div
      style={{
        background: backgroundColor,
      }}
      className="loader"
    ></div>
  );
}

export default Loader;
