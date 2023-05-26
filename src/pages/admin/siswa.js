import { Typography } from "@mui/material";
import React from "react";
import * as XLSX from "xlsx";

const Siswa = () => {
  const [table, setTable] = React.useState([]);

  const convertToJson = async (headers, data) => {
    const rows = [];
    console.log("data", data);
    data.forEach(async (row) => {
      let rowData = {};
      row.forEach(async (element, index) => {
        rowData[headers[index]] = element;
      });
      console.log("rowDatattt", rowData);
      rows.push(rowData);
    });
    setTable(rows);
    return rows;
  };

  const handleSubmit = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const bstr = e.target.result;
      const workBook = XLSX.read(bstr, { type: "binary" });
      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
      const headers = fileData[0];
      const heads = headers.map((head) => ({ title: head, field: head }));
      fileData.splice(0, 1);
      convertToJson(headers, fileData);
    };
    reader.readAsBinaryString(file);
  };
  return (
    <>
      <input type="file" name="input" id="input" onChange={handleSubmit} />
      {table.map((item, index) => (
        <>
          <Typography>{item?.SOAL}</Typography>
        </>
      ))}
      {/* <form onSubmit={handleSubmit}>
        <input type="file" name="input" id="input" />
        <button type="submit">click</button>
      </form> */}
    </>
  );
};
Siswa.layout = "Admin";
export default Siswa;
