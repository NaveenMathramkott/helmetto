import React from "react";
import { FiChevronRight } from "react-icons/fi";

const CategoryCard = ({ image, name, onClick }) => {
  return (
    <article
      className="category-card group relative flex-shrink-0 w-40 sm:w-48 md:w-56 cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      {/* Image with overlay */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Chevron icon */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-300">
          <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg text-primary">
            <FiChevronRight className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Name */}
      <div className="mt-3 text-center">
        <h4 className="font-medium text-gray-900 dark:text-white text-sm leading-snug group-hover:text-primary transition-colors">
          {name}
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          Explore collection
        </p>
      </div>
    </article>
  );
};

export default CategoryCard;
