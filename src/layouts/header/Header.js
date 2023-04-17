import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import FeatherIcon from "feather-icons-react";
import PropTypes from "prop-types";
import ProfileDD from "./ProfileDD";
// Dropdown Component

const Header = ({
  data,
  sx,
  drawerWidth,
  customClass,
  toggleSidebar,
  handleDrawerToggle,
  toggleMobileSidebar,
  position,
}) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        // borderRadius: "20px",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          // onClick={handleDrawerToggle(true)}
          onClick={toggleMobileSidebar}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        {/* posisi profile ada di kanan */}
        <Box flexGrow={1} />
        <ProfileDD data={data} />
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
  customClass: PropTypes.string,
  position: PropTypes.string,
  handleDrawerToggle: PropTypes.func,
  toggleSidebar: PropTypes.func,
  toggleMobileSidebar: PropTypes.func,
};

export default Header;
