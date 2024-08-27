import React from "react";
import "./style.css";

const SectionHeader = ({ heading, onClick }) => {
  return (
    <div className="sectionHeader-mainWrapper">
      <span>{heading}</span>
      <button onClick={() => onClick()}>{`View All >`}</button>
    </div>
  );
};

export default SectionHeader;
