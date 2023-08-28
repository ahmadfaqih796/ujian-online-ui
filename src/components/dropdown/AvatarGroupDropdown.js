import { stringAvatar } from "@/layouts/header/stringAvatar";
import typography from "@/utils/Typography,";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import React from "react";
import CustomImage from "../custom/CustomImage";

const AvatarGroupDropdown = ({ options, onClick, sx }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box display="flex" flexDirection="column">
      <Box sx={{ ...sx }}>
        <Button
          aria-haspopup="true"
          onClick={handleClick}
          aria-label="action"
          size="large"
        >
          <AvatarGroup total={options.length} max={3}>
            {options.map((user, index) => (
              <CustomImage
                key={index}
                src={user.photo}
                alt={user.name}
                margin="0"
              />
            ))}
          </AvatarGroup>
        </Button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Box
            sx={{
              maxHeight: "300px",
              overflow: "scroll",
              width: "300px",
              mb: -1,
            }}
          >
            {options &&
              options?.map((item, idx) => (
                <Box
                  key={idx}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  padding={1}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <CustomImage src={item.photo} alt={item.name} margin="0" />
                    <Box ml={1} mr={2}>
                      <Typography
                        fontSize={typography.h5.fontSize}
                        sx={{
                          lineHeight: "1.235",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        color="darkgreen"
                        fontSize={typography.h6.fontSize}
                        fontWeight="400"
                      >
                        {item.role}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    color={item.status ? "green" : "red"}
                    fontSize={typography.h6.fontSize}
                    fontWeight="400"
                  >
                    {item.status ? "Online" : "Offline"}
                  </Typography>
                </Box>
              ))}
          </Box>
        </Menu>
      </Box>
    </Box>
  );
};

export default AvatarGroupDropdown;
