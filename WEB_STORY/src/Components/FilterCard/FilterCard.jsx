import React from "react";
import { Button } from "../../Components";
import "./FilterCard.css";

function FilterCard({ childrenImage, childrenText }) {
  return (
    <div className="filtercard-main-div">
    
      <img src={childrenImage} height="100%" className="filtercard-img" />
      <div className="filtercard-btn-div">
        <Button className="filtercard-btn">{childrenText} </Button>
      </div>
    </div>
  );
}

export default FilterCard;
