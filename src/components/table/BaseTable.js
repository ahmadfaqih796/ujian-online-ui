import usePagination from "@/hooks/pagination/usePagination";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

const DATA_HEAD = [{ label: "data" }];

const BaseTable = ({ children, tableHead, data, noWrap }) => {
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination();
  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer
        // sx={{ maxHeight: "55vh" }}
        >
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ whiteSpace: noWrap ? "normal" : "nowrap" }}
          >
            <TableHead>
              <TableRow>
                {(tableHead ?? DATA_HEAD).map((row, index) => (
                  <TableCell
                    key={index}
                    align="left"
                    sx={{
                      backgroundColor: "#3D3D3D",
                      color: "white",
                    }}
                  >
                    <Typography variant="h5">{row.label}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{children}</TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
          //  background: "#3D3D3D",
          borderRadius: "0 0 20px 20px",
        }}
      >
        <TablePagination
          component={"div"}
          rowsPerPageOptions={[5, 10, 25]}
          count={data?.total ?? 0}
          rowsPerPage={parseInt(rowsPerPage)}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          showFirstButton
          showLastButton
          labelDisplayedRows={({ from, to, count }) => {
            return `${from}-${to} of ${
              count !== -1 ? count : `more than ${to}`
            }`;
          }}
        />
      </Box>
    </>
  );
};

BaseTable.propTypes = {
  children: PropTypes.node,
  tableHead: PropTypes.array,
  data: PropTypes.object,
  noWrap: PropTypes.bool,
};

export default BaseTable;
