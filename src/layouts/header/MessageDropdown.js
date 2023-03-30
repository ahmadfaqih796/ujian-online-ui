import React from "react";
import Image from "next/image";
import FeatherIcon from "feather-icons-react";
import {
  Badge,
  Box,
  MenuItem,
  Menu,
  Chip,
  Button,
  Link,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import * as data from "./data";

const MessageDropdown = () => {
  const [anchorEl2, setAnchorEl2] = React.useState(null);

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        onClick={handleClick2}
      >
        <Badge variant="dot" color="primary">
          <FeatherIcon icon="message-square" width="20" height="20" />
        </Badge>
      </IconButton>
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "385px",
            right: 0,
            top: "70px !important",
          },
          "& .MuiList-padding": {
            p: "30px",
          },
        }}
      >
        <Box
          sx={{
            mb: 1,
          }}
        >
          <Box display="flex" alignItems="center">
            <Typography variant="h4" fontWeight="500">
              Messages
            </Typography>
            <Box
              sx={{
                ml: 2,
              }}
            >
              <Chip
                size="small"
                label="5 new"
                sx={{
                  borderRadius: "6px",
                  pl: "5px",
                  pr: "5px",
                  backgroundColor: (theme) => theme.palette.secondary.main,
                  color: "#fff",
                }}
              />
            </Box>
          </Box>
        </Box>

        <Box>
          {data.messages.map((message) => (
            <Box key={message.title}>
              <MenuItem
                sx={{
                  pt: 2,
                  pb: 2,
                  borderRadius: "0px",
                }}
              >
                <Box display="flex" alignItems="center">
                  <Badge variant="dot" color={message.status}>
                    <Image
                      src={message.avatar}
                      alt={message.avatar}
                      width="45px"
                      height="45px" className="roundedCircle"
                    />
                  </Badge>

                  <Box
                    sx={{
                      ml: 2,
                    }}
                  >
                    <Typography
                      variant="h5"
                      noWrap
                      sx={{
                        width: "240px",
                      }}
                    >
                      {message.title}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      fontWeight="400"
                      sx={{
                        width: "240px",
                      }}
                      noWrap
                    >
                      {message.subtitle}
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                      {message.time}
                    </Typography>
                  </Box>
                </Box>
              </MenuItem>
              <Divider
                style={{
                  marginTop: 0,
                  marginBottom: 0,
                }}
              />
            </Box>
          ))}
        </Box>
        <Button
          sx={{
            mt: 2,
            display: "block",
            width: "100%",
          }}
          variant="contained"
          color="primary"
          onClick={handleClose2}
        >
          <Link
            to="/email"
            style={{
              color: "#fff",
              width: "100%",
              display: "block",
              textDecoration: "none",
            }}
          >
            See all messages
          </Link>
        </Button>
      </Menu>
    </>
  );
};

export default MessageDropdown;
