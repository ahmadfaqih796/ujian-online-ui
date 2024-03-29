import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import CustomImage from "../custom/CustomImage";

const ChatUserOnline = ({ data, onClick, session, hrefPersonal }) => {
  const router = useRouter();
  const handlePush = async (e, field) => {
    e.preventDefault();
    if (hrefPersonal) {
      await axios.patch("/api/messages", null, {
        params: {
          id_sender: field,
          id_receiver: session.id,
        },
      });
      router.replace({
        pathname: hrefPersonal,
        query: {
          id_user: session.id,
          id_receiver: field,
        },
      });
      return;
    }
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
            onClick={(e) => {
              onClick ? handlePush(e, row.id_user) : null;
            }}
            sx={{
              background: row.id_user == session.receiver ? "#E4F1FF" : null,
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
