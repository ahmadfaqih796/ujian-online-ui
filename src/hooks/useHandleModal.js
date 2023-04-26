import { useState } from "react";

const useHandleModal = (isOpen) => {
  const [openModal, setOpenModal] = useState(isOpen);
  const [modalType, setModalType] = useState();

  const handleOpenModal = (type) => {
    setModalType(type);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return {
    openModal,
    handleOpenModal,
    handleCloseModal,
    modalType,
  };
};

export default useHandleModal;
