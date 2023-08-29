import { stringAvatar } from "@/layouts/header/stringAvatar";
import { styleLeft, styleRight } from "@/styles/message";
import {
  Avatar,
  Box,
  Card,
  Divider,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import moment from "moment/moment";
import Image from "next/image";
import React, { useRef } from "react";
import CustomImage from "./CustomImage";

const Chat = ({ data, session, message, setMessage, handleSend, users }) => {
  console.log("kkkkkk", data);
  const scrollRef = useRef(null);
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [data]);

  // Fungsi untuk memeriksa apakah dua tanggal berbeda (hanya tanggal, tidak termasuk waktu)
  const isDifferentDate = (date1, date2) => {
    return (
      new Date(date1).toLocaleDateString() !==
      new Date(date2).toLocaleDateString()
    );
  };
  return (
    <div>
      <Card>
        <Grid container>
          <Grid item xs={12} lg={3} sx={{ borderRight: 2 }}>
            <Grid item xs={12} style={{ padding: "10px" }}>
              <TextField
                id="outlined-basic-email"
                label="Search"
                size="small"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Divider />
            <List
              sx={{
                // height: "calc(100vh - 240px)",
                maxHeight: "calc(100vh - 300px)",
                overflow: "auto",
                scrollBehavior: "smooth",
              }}
            >
              {users &&
                users.map((row, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      {/* <Avatar
                        alt="Remy Sharp"
                        src="https://material-ui.com/static/images/avatar/1.jpg"
                      /> */}
                      <CustomImage src={row.photo} alt={row.name} margin="0" />
                    </ListItemIcon>
                    <ListItemText primary={row.name}>{row.name}</ListItemText>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body2"
                          style={{ color: row.status ? "green" : "red" }}
                        >
                          {row.status ? "online" : "offline"}
                        </Typography>
                      }
                      align="right"
                    ></ListItemText>
                  </ListItem>
                ))}
            </List>
          </Grid>
          <Grid item xs={12} lg={9}>
            <List
              sx={{
                // height: "calc(100vh - 240px)",
                maxHeight: "calc(100vh - 300px)",
                overflow: "auto",
                scrollBehavior: "smooth",
              }}
            >
              {data &&
                data
                  .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                  .map((row, index) => (
                    <Box key={index}>
                      {index === 0 || // Tampilkan stempel waktu jika ini pesan pertama
                      isDifferentDate(
                        data[index - 1].createdAt,
                        row.createdAt
                      ) ? (
                        <Typography
                          sx={{
                            textAlign: "center",
                            marginTop: 2,
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
                            session.id == row.id_user ? "flex-end" : null,
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
                          <Box
                            sx={
                              session.id == row.id_user ? styleRight : styleLeft
                            }
                          >
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
            <Divider />
            <Grid container style={{ padding: "20px" }}>
              <Grid item xs={11}>
                <TextField
                  id="outlined-basic-email"
                  label="Type Something"
                  fullWidth
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Grid>
              <Grid item xs={1} align="right">
                <Fab color="primary" aria-label="add" onClick={handleSend}>
                  <FeatherIcon icon="send" />
                </Fab>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default Chat;
