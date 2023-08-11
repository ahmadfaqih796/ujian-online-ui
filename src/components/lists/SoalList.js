import React from "react";
import EnhancedSoalTable from "../table/enhaced-table/list-table/EnhacedSoalTable";
import { SOAL_CELL } from "@/utils/headCells/soal-cell";
import useHandleModal from "@/hooks/useHandleModal";

const SoalList = ({ data }) => {
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);
  return (
    <>
      <EnhancedSoalTable
        titleToolbar="Soal"
        data={data}
        headCells={SOAL_CELL}
      />
    </>
  );
};

export default SoalList;
