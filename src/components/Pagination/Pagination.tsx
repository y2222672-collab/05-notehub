import ReactPaginate from "react-paginate";
import css from './Pagination.module.css';


interface PaginationProps {
totalPages: number;
currentPage: number;
onChange: (selectedPage: number) => void;
}

const Pagination = ({totalPages, currentPage, onChange} :PaginationProps) => {

const handlePageClick = (event: { selected: number }) => {
    onChange(event.selected + 1);
  };

  return (
    
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={totalPages}
      previousLabel="< previous"

      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
      

      containerClassName={css.pagination}
      pageClassName={css.pageItem}
      activeClassName={css.active}
      previousClassName={css.prev}
      nextClassName={css.next}
      disabledClassName={css.disabled}
    />
  );

}
export default Pagination;

