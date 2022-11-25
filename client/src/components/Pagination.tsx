import { default as BPagination } from 'react-bootstrap/Pagination'

type PaginationProps = {
    currentPage: number;
    totalItems: number;
    perPage: number;
    onChange: (newPage: number, previousPage: number) => void;
}

function Pagination({ currentPage, totalItems, perPage, onChange }: PaginationProps) {
    console.log("Pagination", currentPage, totalItems, perPage);
    const paginationItems = [];

    paginationItems.push(<BPagination.First key={'paginate-first'} disabled={currentPage === 1} onClick={() => onChange(1, currentPage)} />)
    paginationItems.push(<BPagination.Prev key={'paginate-prev'} disabled={currentPage === 1} onClick={() => onChange(currentPage - 1, currentPage)} />)

    const totalPages = Math.ceil(totalItems / perPage);

    console.log("totalPage", totalPages);

    for (let i = 1; i <= totalPages; i++) {
        paginationItems.push(<BPagination.Item key={`paginate-${i}`} active={currentPage == i} onClick={() => onChange(i, currentPage)}>{ i }</BPagination.Item>)
    }

    paginationItems.push(<BPagination.Next key={'paginate-next'} disabled={currentPage >= totalPages} onClick={() => onChange(currentPage + 1, currentPage)} />)
    paginationItems.push(<BPagination.Last key={'paginate-last'} disabled={currentPage >= totalPages} onClick={() => onChange(totalPages, currentPage)} />)

    return (
        <BPagination className="d-flex justify-content-center">
            { paginationItems }
        </BPagination>
    )
}

export default Pagination;