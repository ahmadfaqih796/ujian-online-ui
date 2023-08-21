import useHandleModal from "@/hooks/useHandleModal";
import { SOAL_CELL } from "@/utils/headCells/soal-cell";
import { Button } from "@mui/material";
import React from "react";
import AddSoalModal from "../modal/soal/AddSoalModal";
import EditSoalModal from "../modal/soal/EditSoalModal";
import EnhancedSoalTable from "../table/enhaced-table/list-table/EnhacedSoalTable";

const SoalList = ({ data }) => {
  const [field, setField] = React.useState({});
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);
  return (
    <>
      <AddSoalModal
        open={openModal}
        type={modalType}
        closeModalHandler={handleCloseModal}
      />
      <EditSoalModal
        open={openModal}
        type={modalType}
        data={field}
        closeModalHandler={handleCloseModal}
      />
      <Button
        color="primary"
        variant="contained"
        onClick={() => handleOpenModal("add")}
      >
        Tambahkan
      </Button>
      <EnhancedSoalTable
        titleToolbar="Soal"
        data={data}
        setField={(field) => setField(field)}
        headCells={SOAL_CELL}
        handleOpenModal={(field) => handleOpenModal(field)}
      />
    </>
  );
};

export default SoalList;
