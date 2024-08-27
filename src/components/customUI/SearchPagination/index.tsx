import { useSearchPagination, DOTS } from '@/hooks/useSearchPagination';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

type SearchPaginationProps = {
    totalCount: number;
    siblingCount?: number;
    pageSize: number;
    className?: string;
};

const SearchPagination: React.FC<SearchPaginationProps> = ({
    totalCount,
    siblingCount = 1,
    pageSize,
    className
}) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get("pageNo") || "1", 10);

    const paginationRange = useSearchPagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    const handlePageChange = useCallback((page: number) => {
        if (page !== currentPage) {
            searchParams.set("pageNo", page.toString());
            setSearchParams(searchParams);
        }
    }, [currentPage, searchParams, setSearchParams]);

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        handlePageChange(currentPage + 1);
    };

    const onPrevious = () => {
        handlePageChange(currentPage - 1);
    };

    const lastPage = paginationRange[paginationRange.length - 1];
    return (
        <ul className={`pagination-container ${className}`}>
            <li
                className={`pagination-item ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={onPrevious}
            >
                <div className="arrow left" />
            </li>

            {paginationRange.map((pageNumber, index) => {
                if (pageNumber === DOTS) {
                    return <li 
                        key={`pDot_${pageNumber}_${index}`} 
                        className="pagination-item dots">
                            &#8230;
                        </li>;
                }
                return (
                    <li
                        key={`pNum_${pageNumber}_${index}`}
                        className={`pagination-item ${pageNumber === currentPage ? 'selected' : ''}`}
                        onClick={() => handlePageChange(Number(pageNumber))}
                    >
                        {pageNumber}
                    </li>
                );
            })}

            <li
                className={`pagination-item ${currentPage === lastPage ? 'disabled' : ''}`}
                onClick={onNext}
            >
                <div className="arrow right" />
            </li>
        </ul>
    );
}

export default SearchPagination