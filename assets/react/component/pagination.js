import React from "react";

const Pagination = ({ totalRapports, perPage, setCurrentPage, currentPage }) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalRapports / perPage); i++) {
        pages.push(i);
    }

    return (
        <nav>
            <ul className="pagination pagination-lg">
                {/* <li className="page-item active" aria-current="page">
      <span className="page-link">1</span>
    </li> */}

                {
                    pages.map((page, index) => {
                        return (<li className={page == currentPage ? "page-item active" : "page-item"} key={index}>
                            <button className="page-link" onClick={() => setCurrentPage(page)}>{page}</button>
                        </li>)
                    })
                }
            </ul>
        </nav>
    )

}

export default Pagination;