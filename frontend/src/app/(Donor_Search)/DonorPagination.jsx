"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const DonorPagination = ({
  currentPage,
  filteredDonors,
  postsPerPage,
  setCurrentPage,
  paginate,
}) => {
  return (
    <div className="my-10 w-full">
      <Pagination>
        <PaginationContent>
          {
            <PaginationItem className="cursor-pointer">
              <PaginationPrevious
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              />
            </PaginationItem>
          }

          {Array.from({
            length: Math.ceil(filteredDonors.length / postsPerPage),
          }).map((_, index) => {
            const pageNumber = index + 1;
            const isActive = pageNumber === currentPage;
            if (
              pageNumber === 1 ||
              pageNumber === currentPage - 2 ||
              pageNumber === currentPage - 1 ||
              pageNumber === currentPage ||
              pageNumber === currentPage + 1 ||
              pageNumber === currentPage + 2 ||
              pageNumber === Math.ceil(filteredDonors.length / postsPerPage)
            ) {
              return (
                <PaginationItem key={index} className="cursor-pointer">
                  <PaginationLink
                    onClick={() => paginate(pageNumber)}
                    isActive={isActive}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            } else if (
              pageNumber === currentPage - 3 ||
              pageNumber === currentPage + 3
            ) {
              return (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            return null;
          })}

          {
            <PaginationItem className="cursor-pointer">
              <PaginationNext
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={
                  currentPage ===
                  Math.ceil(filteredDonors.length / postsPerPage)
                }
              />
            </PaginationItem>
          }
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default DonorPagination;
