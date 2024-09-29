import React from "react";
import { Button } from "../../Components";
import "./FilterCard.css";
import { useNavigate } from "react-router-dom";

function FilterCard({ childrenImage, childrenText }) {
  const navigate = useNavigate();
  const handleFilterClick = () => {
    console.log(childrenText);
    childrenText !== "All" ? navigate(`/${childrenText}`) : navigate("/");
  };

  return (
    <div className="filtercard-main-div">
      <img src={childrenImage} height="100%" className="filtercard-img" />
      <div className="filtercard-btn-div">
        <Button onClick={handleFilterClick} className="filtercard-btn">
          {childrenText}
        </Button>
      </div>
    </div>
  );
}

export default FilterCard;
