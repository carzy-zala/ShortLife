import React, { useState } from "react";
import { Button } from "../../Components";
import "./FilterCard.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function FilterCard({ categoryText = "All" }) {
  const categories = useSelector((store) => store.categories.categories) || [];


  const navigate = useNavigate();

  const handleFilterClick = (category) => {
    category === "All" ? navigate(`/`) : navigate(`/${category}`);
  };

  return categories.map((category, index) => (
    <div key={`${category._id}.${category}`} className="filtercard-main-div">
      <img
        src={category.imageUrl}
        height="100%"
        className="filtercard-img"
        style={{
          outline: categoryText === category.text && "0.5rem solid blue",
        }}
      />
      <div className="filtercard-btn-div">
        <Button
          onClick={() => handleFilterClick(category.text)}
          className="filtercard-btn"
        >
          {category.text}
        </Button>
      </div>
    </div>
  ));
}

export default FilterCard;
