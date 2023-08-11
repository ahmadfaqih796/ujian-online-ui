import React from "react";
import EnhancedSoalTable from "../table/enhaced-table/list-table/EnhacedSoalTable";
import { SOAL_CELL } from "@/utils/headCells/soal-cell";
import useHandleModal from "@/hooks/useHandleModal";
import AddSoalModal from "../modal/soal/AddSoalModal";
import { Button } from "@mui/material";

const SoalList = ({ data }) => {
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);
  return (
    <>
      <AddSoalModal
        open={openModal}
        type={modalType}
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
        headCells={SOAL_CELL}
      />
    </>
  );
};

export default SoalList;
