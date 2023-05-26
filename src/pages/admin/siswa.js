import { Typography } from "@mui/material";
import React from "react";
import * as XLSX from "xlsx";

const Siswa = () => {
  const [question, setQuestion] = React.useState([]);
  console.log(question);

  const payload = question.map((obj) => ({
    ...obj,
    semester: "2",
    kode_kelas: "IX",
    kode_pelajaran: "Biologi",
  }));
  console.log("mamamama", payload);

  const convertToJson = async (headers, data) => {
    const rows = [];
    data.forEach(async (row) => {
      let rowData = {};
      row.forEach(async (element, index) => {
        rowData[headers[index]] = element;
      });
      rows.push(rowData);
    });
    setQuestion(rows);
    return rows;
  };

  const convertArrayFormat = (data) => {
    const newData = data.map((item) => {
      if (item === "SOAL") {
        return "pertanyaan";
      } else if (item === "A") {
        return "pilihan_a";
      } else if (item === "B") {
        return "pilihan_b";
      } else if (item === "KUNCI") {
        return "kunci";
      } else {
        return item; // Jika ada nilai lain dalam array, biarkan tidak berubah
      }
    });
    return newData;
  };

  const handleUpload = (event) => {
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
      console.log("xxxxxxxxxx", headers);
      convertToJson(convertArrayFormat(headers), fileData);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <>
      <input type="file" name="input" id="input" onChange={handleUpload} />
      {JSON.stringify(question)}
      <form onSubmit={handleSubmit}>
        <button type="submit">click</button>
      </form>
    </>
  );
};
Siswa.layout = "Admin";
export default Siswa;
