import React from "react";
import "./style.css";

const CategorySkeleton = () => {
  return (
    <div className="skeletonWrapper borderAnimation">
      {[...Array(7)].map((item, index) => (
        <div className="cateSkeletonWrapper" key={`${item}-${index}`}>
          <div className="categorySkeleton-wrapper skeletonAnimation" />
          <span className="titleCateSkeletonWrapper skeletonAnimation" />
        </div>
      ))}
    </div>
  );
};
const ProductSkeleton = () => {
  return (
    <div className="skeletonProductWrapper borderAnimation">
      {[...Array(12)].map((item, index) => (
        <div
          className="ProductSkeleton-wrapper skeletonAnimation"
          key={`${item}-${index}`}
        />
      ))}
    </div>
  );
};

export { CategorySkeleton, ProductSkeleton };
