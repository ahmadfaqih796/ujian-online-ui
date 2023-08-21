import usePaginationEnhaced from "@/hooks/pagination/usePaginationEnhaced";
import { getComparator, stableSort } from "@/utils/sortingTable";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import EnhancedTableHead from "../EnhacedTableHead";
import EnhancedTableToolbar from "../EnhachedTableToolbar";
import ThreeDots from "@/components/menu-items/ThreeDots";

const options = [
  {
    label: "Edit",
    type: "edit",
  },
  {
    label: "Delete",
    type: "delete",
  },
];

const EnhancedSoalTable = ({
  titleToolbar,
  data,
  setField,
  headCells,
  handleOpenModal,
}) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("pertanyaan");
  const [selected, setSelected] = React.useState([]);

  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePaginationEnhaced();

  const handleClickDot = (item, type, id) => {
    if (item && type === "edit") {
      setField(item);
      handleOpenModal("edit");
    } else if (item && type === "delete") {
      // setUserData(item);
      handleOpenModal("delete");
    } else if (item && type === "detail") {
      router.push(`/admin/konfigurasi/soal/${id}`);
    }
    return;
  };

  const handleRequestSort = (event, property) => {
    event.preventDefault();
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((row) => row.id_soal);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleSelectClick = (event, name) => {
    event.preventDefault();
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Hindari lompatan tata letak saat mencapai halaman terakhir dengan data kosong.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const visibleRows = stableSort(data, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          titleToolbar={titleToolbar}
          numSelected={selected.length}
          data={selected}
          setSelected={(field) => setSelected(field)}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              headCells={headCells}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id_soal);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleSelectClick(event, row.id_soal)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id_soal}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.pertanyaan}
                    </TableCell>
                    <TableCell align="right">{row.pilihan_a}</TableCell>
                    <TableCell align="right">{row.pilihan_b}</TableCell>
                    <TableCell align="right">{row.pilihan_c}</TableCell>
                    <TableCell align="right">{row.pilihan_d}</TableCell>
                    <TableCell align="right">{row.pilihan_e}</TableCell>
                    <TableCell>
                      <ThreeDots
                        sx={{ textAlign: "right" }}
                        options={options}
                        onClick={(show) =>
                          handleClickDot(row, show, row?.id_soal)
                        }
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={99} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default EnhancedSoalTable;
