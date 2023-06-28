import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import FeatherIcon from "feather-icons-react";
import React from "react";

const ThreeDots = ({ options, onClick, sx }) => {
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
        <IconButton
          aria-haspopup="true"
          onClick={handleClick}
          aria-label="action"
          size="large"
        >
          <FeatherIcon icon="more-vertical" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {options &&
            options?.map((item, idx) => (
              <MenuItem key={idx} onClick={() => onClick?.(item.type)}>
                {item.label}
              </MenuItem>
            ))}
        </Menu>
      </Box>
    </Box>
  );
};

export default ThreeDots;
