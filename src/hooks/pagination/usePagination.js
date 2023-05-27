import { useRouter } from "next/router";
import { useState } from "react";

const usePagination = () => {
  const router = useRouter();
  const currentPage = router.query?.page ?? 1;
  const currentRowPerPage = router.query?.per_page ?? 10;
  const [page, setPage] = useState(parseInt(currentPage - 1));
  const [rowsPerPage, setRowsPerPage] = useState(parseInt(currentRowPerPage));

  const handleChangePage = async (event, newPage) => {
    await router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: newPage + 1,
      },
    });
    setPage(newPage);
  };

  const handleChangeRowsPerPage = async (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(parseInt(0));
    await router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        per_page: event.target.value,
        page: 1,
      },
    });
  };
  return { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage };
};

export default usePagination;
