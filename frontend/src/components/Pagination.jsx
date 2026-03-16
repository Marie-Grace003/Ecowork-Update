export default function Pagination({ currentPage, lastPage, onPageChange }) {
    if (lastPage <= 1) return null

    return (
        <div className="flex items-center justify-center gap-2 mt-6">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-xl text-sm font-medium border border-gray-200 text-gray-600 hover:bg-eco-light transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
                <i className="bi bi-arrow-left me-1"></i>
                Précédent
            </button>

            <span className="px-4 py-2 text-sm text-gray-500">
                Page {currentPage} / {lastPage}
            </span>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === lastPage}
                className="px-4 py-2 rounded-xl text-sm font-medium border border-gray-200 text-gray-600 hover:bg-eco-light transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
                Suivant
                <i className="bi bi-arrow-right ms-1"></i>
            </button>
        </div>
    )
}