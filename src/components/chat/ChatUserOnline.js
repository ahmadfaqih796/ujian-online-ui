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
import { useRouter } from "next/router";

const ChatUserOnline = ({ data, onClick, session }) => {
  const router = useRouter();
  const handlePush = (field) => {
    router.replace(`/admin/customer-service/${field}`);
  };
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
          <ListItem
            button={onClick ? true : false}
            key={index}
            onClick={() => {
              onClick ? handlePush(row.id) : null;
            }}
            sx={{ background: row.id == session.receiver ? "#E4F1FF" : null }}
          >
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
