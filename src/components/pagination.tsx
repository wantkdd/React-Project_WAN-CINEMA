import React from 'react';

interface PaginationProps {
  currentPage: number;
  onNextPage: () => void;
  onPrevPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onNextPage,
  onPrevPage,
}) => {
  return (
    <div className="bg-gray-800 flex justify-center my-6 items-center space-x-4">
      <button
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded text-white font-bold transition ${
          currentPage === 1 ? 'bg-gray-300' : 'bg-purple-300 hover:bg-green-300'
        }`}
      >
        &lt;
      </button>

      <div className="px-4 py-2  text-white font-bold">{currentPage}페이지</div>

      <button
        onClick={onNextPage}
        className="px-4 py-2 rounded text-white bg-purple-300 hover:bg-green-300 font-bold"
      >
        &gt;
      </button>
    </div>
  );  
};

export default Pagination;
