import { stringAvatar } from "@/layouts/header/stringAvatar";
import { styleLeft, styleRight } from "@/styles/message";
import { Avatar, Box, List, Typography } from "@mui/material";
import moment from "moment/moment";
import Image from "next/image";
import React from "react";

const ChatMessage = ({ data, session }) => {
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
  return (
    <List
      sx={{
        maxHeight: "calc(100vh - 300px)",
        minHeight: "calc(100vh - 300px)",
        overflow: "auto",
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
                  justifyContent: session.id == row.id_user ? "flex-end" : null,
                }}
              >
                {session.id != row.id_user &&
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
                      session.id == row.id_user ? "flex-end" : null,
                  }}
                >
                  {session.id != row.id_user && (
                    <Typography ml={2.5} variant="body1" fontSize={12}>
                      {row?.name ||
                        row?.user_data?.user_admin?.nama_admin ||
                        "anonymus"}
                    </Typography>
                  )}
                  <Box sx={session.id == row.id_user ? styleRight : styleLeft}>
                    {row.text}
                  </Box>
                  <Box
                    sx={{
                      mt: -1,
                      mb: 1,
                      ml: session.id == row.id_user ? "auto" : "20px",
                      mr: session.id == row.id_user ? "20px" : "0",
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
