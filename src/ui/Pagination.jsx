const ITEMS_PER_PAGE = 5;

export default function Pagination({ currentPage, totalVideos, onPageChange }) {
  const totalPages = Math.ceil(totalVideos / ITEMS_PER_PAGE);

  return (
    <div className="flex mt-4">
      {Array.from({ length: totalPages }).map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-full mx-1 ${
              currentPage === page
                ? "bg-purple-500 text-white"
                : "bg-purple-200 hover:bg-purple-400 hover:text-white"
            }`}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}
