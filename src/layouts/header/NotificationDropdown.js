import React from "react";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import {
  Box,
  MenuItem,
  Typography,
  Avatar,
  Divider,
  IconButton,
  Menu,
  Chip,
  Button,
  Link,
  Badge,
} from "@mui/material";
import * as data from "./data";

const NotificationDropdown = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        size="large"
        aria-label="menu"
        color="inherit"
        aria-controls="notification-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Badge variant="dot" color="secondary">
          <FeatherIcon icon="bell" width="20" height="20" />
        </Badge>
      </IconButton>
      <Menu
        id="notification-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
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
              Notifications
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
                  backgroundColor: (theme) => theme.palette.warning.main,
                  color: "#fff",
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box>
          {data.notifications.map((notification) => (
            <Box key={notification.title}>
              <MenuItem
                sx={{
                  pt: 2,
                  pb: 2,
                  borderRadius: "0px",
                }}
              >
                <Box display="flex" alignItems="center">
                  <Image
                    src={notification.avatar}
                    alt={notification.avatar}
                    width="45px"
                    height="45px" className="roundedCircle"
                  />
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
                      {notification.title}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      noWrap
                      fontWeight="400"
                      sx={{
                        width: "240px",
                      }}
                    >
                      {notification.subtitle}
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
          onClick={handleClose}
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
            See all notifications
          </Link>
        </Button>
      </Menu>
    </>
  );
};
export default NotificationDropdown;
