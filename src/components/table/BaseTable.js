import usePagination from "@/hooks/pagination/usePagination";
import {
  Box,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

const DATA_HEAD = [{ label: "data" }];

const BaseTable = ({ children, tableHead, data, noWrap }) => {
  const router = useRouter();
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
          justifyContent: "space-between",
          //  background: "#3D3D3D",
          borderRadius: "0 0 20px 20px",
        }}
      >
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={rowsPerPage}
          onChange={handleChangeRowsPerPage}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
        </Select>
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(data.total / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
          />
        </Stack>
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
