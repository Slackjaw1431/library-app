export const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  paginate: any;
}> = (props) => {
  const pageNumbers = [];

  const numberOfPageNumbers = 5; // min 3
  let pagesBefore;
  let pagesAfter;

  const halfPages = Math.floor(numberOfPageNumbers / 2);
  const totalPages = Math.min(props.totalPages, numberOfPageNumbers);

  // filling in the available pages out of total to choose from
  // most sites keep it simple with elipses and only show the nearest   proceeding and preceeing pages

  if (props.currentPage <= halfPages) {
    pagesBefore = props.currentPage - 1;
  } else if (props.currentPage > props.totalPages - halfPages) {
    pagesBefore = totalPages - (props.totalPages - props.currentPage) - 1;
  } else {
    pagesBefore = halfPages;
  }

  pagesAfter = totalPages - pagesBefore - 1;

  for (let i = pagesBefore; i > 0; i--) {
    pageNumbers.push(props.currentPage - i);
  }

  pageNumbers.push(props.currentPage);

  for (let i = 1; i <= pagesAfter; i++) {
    pageNumbers.push(props.currentPage + i);
  }

  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li className="page-item" onClick={() => props.paginate(1)}>
          {/* first page fixed, calls the paginate function when clicked*/}
          <button className="page-link">First Page</button>
        </li>
        {pageNumbers.map(
          (
            number //middle pages
          ) => (
            <li
              key={number}
              onClick={() => props.paginate(number)}
              className={
                "page-item " + (props.currentPage === number ? "active" : "")
              }
            >
              <button className="page-link">{number}</button>
            </li>
          )
        )}
        {/* last page also fixed */}
        <li
          className="page-item"
          onClick={() => props.paginate(props.totalPages)}
        >
          <button className="page-link">Last Page</button>
        </li>
      </ul>
    </nav>
  );
};
