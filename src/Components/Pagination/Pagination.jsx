
import React from 'react';
import './Pagination.css';
import Button from "../Button/Button";

const Pagination = ({ currentPage, setCurrentPage, totalItems, itemsPerPage }) => {

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };



    return (
        <div className="pagination-container">
            <Button text='Prev'
                className="page-btn"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
            />

            {Array.from({ length: totalPages }, (_, index) => {
                const pageNum = index + 1;
                return (
                    <button
                        key={pageNum}
                        className={`page-btn ${pageNum === currentPage ? 'active' : ''}`}
                        onClick={() => goToPage(pageNum)}
                    >
                        {pageNum}
                    </button>

                );
            })}

            <Button text='Next'
                    className="page-btn"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
            />

        </div>
    );
};

export default Pagination;
