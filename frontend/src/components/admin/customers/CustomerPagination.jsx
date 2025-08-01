const CustomerPagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 py-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-4 py-2 border border-yellow-500 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-yellow-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
      >
        ← Previous
      </button>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        Page
        <input
          type="number"
          min="1"
          max={totalPages}
          value={currentPage}
          onChange={(e) => {
            const page = Number(e.target.value);
            if (page >= 1 && page <= totalPages) {
              onPageChange(page);
            }
          }}
          className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        of <span className="font-semibold">{totalPages}</span>
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-4 py-2 border border-yellow-500 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-yellow-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
      >
        Next →
      </button>
    </div>
  );
};

export default CustomerPagination;
