import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import logo from "../../assets/images/logo-ujian-blue.png";
import Menuitems from "./sidebar/MenuItems";

import { Collapse } from "@mui/material";
import FeatherIcon from "feather-icons-react";
import ProfileDD from "./header/ProfileDD";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import { useUserSession } from "@/hooks/auth/useUserSession";

const drawerWidth = 265;

const AdminLayout = ({ children, window }) => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  const { data, error } = useUserSession();

  if (!data) {
    return <>Tunggu Sebentar sedang meload data</>;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header
        data={data}
        drawerWidth={drawerWidth}
        handleDrawerToggle={() => {
          handleDrawerToggle;
        }}
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        toggleMobileSidebar={() => setMobileSidebarOpen(true)}
      />

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
