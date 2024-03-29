import { Box, Card, Divider, Grid, TextField } from "@mui/material";
import ChatInput from "../chat/ChatInput";
import ChatMessage from "../chat/ChatMessage";
import ChatUserOnline from "../chat/ChatUserOnline";
import ChatFileDisplay from "../chat/ChatFileDisplay";
import React from "react";
import ChatBlankLayout from "../chat/ChatBlankLayout";

const Chat = ({
  data,
  session,
  users,
  personal,
  grup,
  setSearch,
  hrefPersonal,
}) => {
  const [file, setFile] = React.useState({});
  console.log("filse", file);
  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  return (
    <Card>
      <Grid container>
        <Grid
          item
          xs={12}
          md={4}
          lg={3}
          sx={{ borderRight: 2, display: { xs: "none", md: "block" } }}
        >
          <Grid item xs={12} sx={{ p: "10px" }}>
            <TextField
              id="outlined-basic-email"
              label="Search"
              name="search"
              onChange={(e) => handleChange(e)}
              size="small"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Divider />
          <ChatUserOnline
            data={users}
            onClick={personal}
            session={session}
            hrefPersonal={hrefPersonal}
          />
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          {session.receiver ? (
            <React.Fragment>
              {file.url != null ? (
                <ChatFileDisplay file={file} />
              ) : (
                <ChatMessage
                  data={data}
                  setFile={(field) => setFile(field)}
                  session={session}
                  personal={personal}
                />
              )}
              <Divider />
              <ChatInput
                session={session}
                personal={personal}
                file={file}
                setFile={(field) => setFile(field)}
                grup={grup}
              />
            </React.Fragment>
          ) : (
            <ChatBlankLayout />
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

export default Chat;
