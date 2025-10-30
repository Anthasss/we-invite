/**
 * Pagination component for navigating through pages
 * @param {number} currentPage - Current active page
 * @param {number} totalPages - Total number of pages
 * @param {Function} onPageChange - Callback when page changes
 */
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center mt-8">
      <div className="join">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`join-item btn text-secondary ${
              currentPage === index + 1 ? "btn-active" : ""
            }`}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
