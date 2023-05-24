import React from "react";
import readXlsxFile from "read-excel-file";

const Siswa = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { target } = event;
    const { input } = target;
    console.log("xxxx", input.files[0]);
    readXlsxFile(input.files[0]).then((rows) => {
      console.log("aaaaaaaa", rows);
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" name="input" id="input" />
        <button type="submit">click</button>
      </form>
    </>
  );
};
Siswa.layout = "Admin";
export default Siswa;
