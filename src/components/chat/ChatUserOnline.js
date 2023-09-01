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
import CustomImage from "../custom/CustomImage";

const ChatUserOnline = ({ data }) => {
  return (
    <List
      sx={{
        maxHeight: "calc(100vh - 270px)",
        overflow: "auto",
        scrollBehavior: "smooth",
      }}
    >
      {data &&
        data.map((row, index) => (
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
  );
};

export default ChatUserOnline;
