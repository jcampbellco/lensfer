import { default as BPagination } from 'react-bootstrap/Pagination'

type PaginationProps = {
    currentPage: number;
    totalItems: number;
    perPage: number;
    numOfItems: number;
    onChange: (newPage: number, previousPage: number) => void;
}

function Pagination({ currentPage, totalItems, perPage, onChange, numOfItems }: PaginationProps) {
    const paginationItems = [];

    paginationItems.push(<BPagination.First key={'paginate-first'} disabled={currentPage === 1} onClick={() => onChange(1, currentPage)} />)
    paginationItems.push(<BPagination.Prev key={'paginate-prev'} disabled={currentPage === 1} onClick={() => onChange(currentPage - 1, currentPage)} />)

    const totalPages = Math.ceil(totalItems / perPage);
    const numOfItemsSplit = Math.floor(numOfItems / 2);
    let start;
    let end;

    if (numOfItems >= totalPages) {
        start = 1;
        end = totalPages;
    } else if ((currentPage - numOfItemsSplit) < 1) {
        start = 1;
        end = 1 + numOfItems - 1;
    } else if ((currentPage + numOfItemsSplit) > totalPages) {
        start = totalPages - numOfItems + 1;
        end = totalPages;
    } else {
        start = currentPage - numOfItemsSplit;
        end = currentPage + numOfItemsSplit;
    }

    if (start > 1) {
        paginationItems.push(<BPagination.Ellipsis key={`paginate-lower-ellipsis`} disabled />);
    }

    for (let i = start; i <= end; i++) {
        paginationItems.push(<BPagination.Item key={`paginate-${i}`} active={currentPage == i} onClick={() => onChange(i, currentPage)}>{ i }</BPagination.Item>)
    }

    if (end < totalPages) {
        paginationItems.push(<BPagination.Ellipsis key={`paginate-upper-ellipsis`} disabled />);
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