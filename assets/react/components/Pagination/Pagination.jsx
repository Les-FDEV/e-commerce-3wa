import React, {useEffect, useState} from "react";

const Pagination = ({onPageChange, pages}) => {
    const [pageList, setPageList] = useState([]);


    const getPagesList = () => {
        if (pages === undefined) {
            return [];
        }
        const pagesList = [];
        for (const [key, value] of Object.entries(pages)) {
            if (key.includes("hydra")) {
                if (key === 'hydra:first') {
                    pagesList.push(<li key={key}>
                        <button className="page-link" onClick={() => onPageChange(value)}>First</button>
                    </li>);
                }
                if (key === 'hydra:previous') {
                    pagesList.push(<li key={key}>
                        <button className="page-link" onClick={() => onPageChange(value)}>Previous</button>
                    </li>);
                }
                if (key === 'hydra:next') {
                    pagesList.push(<li key={key}>
                        <button className="page-link" onClick={() => onPageChange(value)}>Next</button>
                    </li>);
                }
                if (key === 'hydra:last') {
                    pagesList.push(<li key={key}>
                        <button className="page-link" onClick={() => onPageChange(value)}>Last</button>
                    </li>);
                }
            }
        }
        return pagesList;
    }

    useEffect(() => {
        setPageList(getPagesList());
    }, [pages])

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination d-flex justify-content-center">
                {pageList}
            </ul>
        </nav>
    );
};


export default Pagination;
