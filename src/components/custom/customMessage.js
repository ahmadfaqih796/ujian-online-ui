import {
  Card,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import ChatInput from "../chat/ChatInput";
import ChatMessage from "../chat/ChatMessage";
import CustomImage from "./CustomImage";

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
          <List
            sx={{
              maxHeight: "calc(100vh - 300px)",
              overflow: "auto",
              scrollBehavior: "smooth",
            }}
          >
            {users &&
              users.map((row, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CustomImage src={row.photo} alt={row.name} margin="0" />
                  </ListItemIcon>
                  <ListItemText primary={row.name} secondary={row.role} />
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
