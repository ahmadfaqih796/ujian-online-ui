import { stringAvatar } from "@/layouts/header/stringAvatar";
import { styleLeft, styleRight } from "@/styles/message";
import { Avatar, Box, List, Skeleton, Typography } from "@mui/material";
import moment from "moment/moment";
import Image from "next/image";
import React from "react";
import fileImg from "../../../assets/images/file.svg";
import { useRouter } from "next/router";
import { BASE_API_URL } from "@/utils/baseUrl";

const ChatMessage = ({ data, session }) => {
  const router = useRouter();
  const scrollRef = React.useRef(null);
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [data]);
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
  return (
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
              isDifferentDate(data[index - 1].createdAt, row.createdAt) ? (
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
                {row.file_url ? (
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
                    sx={session.id == row.id_sender ? styleRight : styleLeft}
                  >
                    {row.text}
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
  );
};

export default ChatMessage;
