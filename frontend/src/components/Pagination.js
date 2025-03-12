import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  return (
    <div className="flex justify-center items-center mt-8">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span className="mx-4 text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
