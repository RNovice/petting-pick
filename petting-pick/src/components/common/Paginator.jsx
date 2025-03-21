import PropTypes from "prop-types";

const Paginator = ({ currentPage, totalPages, onPageChange }) => {
  function handlePageChange(page) {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  }

  function renderPageNumbers() {
    const pageNumbers = [];
    const range = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - range && i <= currentPage + range)
      ) {
        pageNumbers.push(
          <li
            key={i}
            className={`page-item ${i === currentPage ? "active" : ""}`}
            onClick={() => handlePageChange(i)}
          >
            <button className="page-link">{i}</button>
          </li>
        );
      } else if (
        i === currentPage - range - 1 ||
        i === currentPage + range + 1
      ) {
        pageNumbers.push(
          <li key={i} className="page-item">
            <span className="page-link">...</span>
          </li>
        );
      }
    }

    return pageNumbers;
  }

  return (
    <nav>
      <ul className="pagination justify-content-end user-select-none">
        <li
          className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <button className="page-link">&lt;</button>
        </li>

        {renderPageNumbers()}

        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <button className="page-link">&gt;</button>
        </li>
      </ul>
    </nav>
  );
};

Paginator.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Paginator;
