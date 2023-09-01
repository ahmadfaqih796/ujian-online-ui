import { Card, Divider, Grid, TextField } from "@mui/material";
import ChatInput from "../chat/ChatInput";
import ChatMessage from "../chat/ChatMessage";
import ChatUserOnline from "../chat/ChatUserOnline";

const Chat = ({ data, session, users }) => {
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
              size="small"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Divider />
          <ChatUserOnline data={users} />
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <ChatMessage data={data} session={session} />
          <Divider />
          <ChatInput session={session} />
        </Grid>
      </Grid>
    </Card>
  );
};

export default Chat;
