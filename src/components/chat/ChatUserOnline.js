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

const ChatUserOnline = ({ data, onClick }) => {
  const router = useRouter();
  const handlePush = (field) => {
    router.replace(`/admin/customer-service/${field}`, null, { shallow: true });
    setTimeout(() => {
      router.reload();
    }, 500);
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
