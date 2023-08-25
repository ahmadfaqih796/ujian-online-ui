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
import React, { useRef } from "react";

const Chat = ({ data, session, message, setMessage, handleSend }) => {
  console.log("kkkkkk", data);
  const scrollRef = useRef(null);
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [data]);

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5">Chat</Typography>
        </Grid>
      </Grid>
      <Card>
        <Grid container>
          {/* <Grid item xs={3} sx={{ borderRight: 2 }}>
            <List>
              <ListItem button key="RemySharp">
                <ListItemIcon>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://material-ui.com/static/images/avatar/1.jpg"
                  />
                </ListItemIcon>
                <ListItemText primary="John Wick"></ListItemText>
              </ListItem>
            </List>
            <Divider />
            <Grid item xs={12} style={{ padding: "10px" }}>
              <TextField
                id="outlined-basic-email"
                label="Search"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Divider />
            <List>
              <ListItem button key="RemySharp">
                <ListItemIcon>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://material-ui.com/static/images/avatar/1.jpg"
                  />
                </ListItemIcon>
                <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
                <ListItemText secondary="online" align="right"></ListItemText>
              </ListItem>
              <ListItem button key="Alice">
                <ListItemIcon>
                  <Avatar
                    alt="Alice"
                    src="https://material-ui.com/static/images/avatar/3.jpg"
                  />
                </ListItemIcon>
                <ListItemText primary="Alice">Alice</ListItemText>
              </ListItem>
            </List>
          </Grid> */}
          <Grid item xs={12}>
            <List
              sx={{
                maxHeight: "calc(100vh - 240px)",
                overflow: "auto",
                scrollBehavior: "smooth",
              }}
            >
              {/* {data &&
                data
                  .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                  .map((row, index) => (
                    <ListItem key={index}>
                      <Grid container>
                        <Grid item xs={12}>
                          <ListItemText
                            align={session.id == row.id_user ? "left" : "right"}
                            primary={
                              row?.name ||
                              row?.user_data?.user_admin?.nama_admin ||
                              "anonymus"
                            }
                          ></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                          <ListItemText
                            align={session.id == row.id_user ? "left" : "right"}
                            primary={row?.text || "delay cuy"}
                          ></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                          <ListItemText
                            align={session.id == row.id_user ? "left" : "right"}
                            secondary={row?.createdAt || "waktu"}
                          ></ListItemText>
                        </Grid>
                      </Grid>
                    </ListItem>
                  ))} */}
              {data &&
                data
                  .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                  .map((row, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent:
                          session.id == row.id_user ? null : "flex-end",
                      }}
                    >
                      <Box
                        sx={session.id == row.id_user ? styleLeft : styleRight}
                      >
                        {row.text}
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
              <Grid xs={1} align="right">
                <Fab color="primary" aria-label="add" onClick={handleSend}>
                  {/* <SendIcon /> */}+
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
