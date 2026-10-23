import React from "react";
import { Button } from "../../components/ui/button";
import { FiChevronRight } from "react-icons/fi";

const SectionHeader = ({ heading, subheading, onClick, children }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          {heading}
        </h2>
        {subheading && (
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm md:text-base">
            {subheading}
          </p>
        )}
      </div>
      <div className="flex-shrink-0 mt-4 sm:mt-0">
        {children ? (
          children
        ) : onClick ? (
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
            onClick={onClick}
          >
            View All
            <FiChevronRight className="h-4 w-4" />
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default SectionHeader;
