import useUploadFile from "@/hooks/upload/useUploadFile";
import useHandleModal from "@/hooks/useHandleModal";
import { stringAvatar } from "@/layouts/header/stringAvatar";
import { styleLeft, styleRight } from "@/styles/message";
import { BASE_API_URL } from "@/utils/baseUrl";
import { Avatar, Box, List, Typography } from "@mui/material";
import moment from "moment/moment";
import Image from "next/image";
import React from "react";
import img1 from "../../../assets/images/drag.svg";
import fileImg from "../../../assets/images/file.svg";
import ChatDeleteMessage from "./ChatDeleteMessage";

const ChatMessage = ({ data, session, setFile }) => {
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);
  const [message, setMessage] = React.useState({});
  const [dragging, setDragging] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState({});
  const scrollRef = React.useRef(null);

  const { onSelectFile, banner, preview, errorFiles, errorMessage } =
    useUploadFile();

  React.useEffect(() => {
    setFile({
      ...(preview && {
        url: preview,
        type: banner?.type,
        name: banner?.name,
        file: selectedFile,
        error: errorFiles,
        response: errorMessage,
      }),
    });
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [data, preview]);

  const handleDelete = (obj, type) => {
    if (obj && type === "delete") {
      setMessage(obj);
      handleOpenModal(type);
    }
  };

  const isDifferentDate = (date1, date2) => {
    return (
      new Date(date1).toLocaleDateString() !==
      new Date(date2).toLocaleDateString()
    );
  };

  const fileType = (field) => {
    const type = field ? field.split("/") : [];
    return type[0];
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    onSelectFile(e);
    setDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setSelectedFile(files[0]);
    console.log("Daftar file yang di-drop:", files);
  };

  return (
    <React.Fragment>
      <ChatDeleteMessage
        open={openModal}
        type={modalType}
        data={message}
        title={"Pesan"}
        closeModalHandler={handleCloseModal}
      />
      <Box
        component="div"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragEnd={handleDragEnd}
      >
        {dragging ? (
          <Box
            sx={{
              maxHeight: "calc(100vh - 300px)",
              minHeight: "calc(100vh - 300px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Image
              alt={"no_image"}
              src={img1}
              width={0}
              height={0}
              sizes="100vw"
              priority={true}
              style={{
                objectFit: "contain",
                width: "auto",
                height: "20vh",
                marginBottom: "16px",
              }}
            />
            <Typography>Jatuhkan file di sini.</Typography>
          </Box>
        ) : (
          <List
            sx={{
              maxHeight: "calc(100vh - 300px)",
              minHeight: "calc(100vh - 300px)",
              overflowY: "auto",
              overflowX: "hidden",
              scrollBehavior: "smooth",
            }}
          >
            {data &&
              data
                .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                .map((row, index) => (
                  <Box key={index}>
                    {index === 0 ||
                    isDifferentDate(
                      data[index - 1].createdAt,
                      row.createdAt
                    ) ? (
                      <Typography
                        sx={{
                          textAlign: "center",
                          mt: 2,
                          mb: 2,
                          color: "gray",
                        }}
                      >
                        {moment(row.createdAt).format("D MMMM YYYY")}
                      </Typography>
                    ) : null}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent:
                          session.id == row.id_sender ? "flex-end" : null,
                      }}
                    >
                      {!row.is_deleted && row.file_url ? (
                        fileType(row.file_type) === "image" ? (
                          <Image
                            id="file"
                            alt={row.file_name ?? "no_image"}
                            src={`http://localhost:3030/uploads/${row?.file_url}`}
                            onClick={() => {
                              window.open(
                                `${BASE_API_URL.base_image_url}/${row?.file_url}`,
                                "_blank"
                              );
                            }}
                            width={0}
                            height={0}
                            sizes="100vw"
                            priority={true}
                            style={{
                              objectFit: "contain",
                              width: "auto",
                              height: "100px",
                              borderRadius: "16px",
                              margin: "10px 20px",
                              marginLeft:
                                session.id == row.id_sender ? "20px" : "75px",
                              cursor: "pointer",
                            }}
                          />
                        ) : (
                          <Box
                            id="file"
                            component="button"
                            onClick={() => {
                              window.open(
                                `${BASE_API_URL.base_image_url}/${row?.file_url}`,
                                "_blank"
                              );
                            }}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              p: 1,
                              mt: "10px",
                              mb: "10px",
                              ml: session.id == row.id_sender ? "0" : "75px",
                              mr: session.id == row.id_sender ? "20px" : "0",
                              background: "#EBFFED",
                              color: "black",
                              cursor: "pointer",
                              borderRadius: 2,
                            }}
                          >
                            <Image
                              alt={row.file_name ?? "no_image"}
                              src={fileImg}
                              width={0}
                              height={0}
                              sizes="100vw"
                              priority={true}
                              style={{
                                objectFit: "contain",
                                width: "auto",
                                height: "30px",
                              }}
                            />
                            <Typography sx={{ fontSize: 12 }}>
                              {row.file_name}
                            </Typography>
                          </Box>
                        )
                      ) : null}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent:
                          session.id == row.id_sender ? "flex-end" : null,
                      }}
                    >
                      {session.id != row.id_sender &&
                        (row?.user_data?.user_admin?.photo || row.photo ? (
                          <Image
                            alt={row.name ?? "no_image"}
                            src={`http://localhost:3030/uploads/${
                              row?.user_data?.user_admin?.photo || row.photo
                            }`}
                            width="40"
                            height="40"
                            priority={true}
                            style={{
                              objectFit: "contain",
                              border: "2px solid gray",
                              borderRadius: "50%",
                              marginLeft: "16px",
                              marginTop: "16px",
                            }}
                          />
                        ) : (
                          <Avatar
                            {...stringAvatar(
                              row?.name ||
                                row?.user_data?.user_admin?.nama_admin ||
                                "anonymus",
                              35
                            )}
                            sx={{ mt: 2, ml: 2 }}
                          />
                        ))}
                      <Box
                        sx={{
                          maxWidth: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent:
                            session.id == row.id_sender ? "flex-end" : null,
                        }}
                      >
                        {session.id != row.id_sender && (
                          <Typography ml={2.5} variant="body1" fontSize={12}>
                            {row?.name ||
                              row?.user_data?.user_admin?.nama_admin ||
                              "anonymus"}
                          </Typography>
                        )}
                        <Box
                          sx={
                            session.id == row.id_sender ? styleRight : styleLeft
                          }
                          onClick={() => {
                            session.id == row.id_sender && !row.is_deleted
                              ? handleDelete(row, "delete")
                              : null;
                          }}
                        >
                          {row.is_deleted
                            ? "Pesan ini sudah dihapus"
                            : row.text}
                        </Box>
                        <Box
                          sx={{
                            mt: -1,
                            mb: 1,
                            ml: session.id == row.id_sender ? "auto" : "20px",
                            mr: session.id == row.id_sender ? "20px" : "0",
                          }}
                        >
                          {moment(row.createdAt).format("HH:mm")}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
            <div ref={scrollRef}></div>
          </List>
        )}
      </Box>
    </React.Fragment>
  );
};

export default ChatMessage;
