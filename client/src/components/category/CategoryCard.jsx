import React from "react";
import "./style.css";

const CategoryCard = ({ image, name, onClick }) => {
  return (
    <div className="categoryCard-mainWrapper" onClick={onClick}>
      <img src={image} alt={name} />
      <span>{name}</span>
    </div>
  );
};

export default CategoryCard;
