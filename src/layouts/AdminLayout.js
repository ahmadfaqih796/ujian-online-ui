import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";

import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { useUserSession } from "@/hooks/auth/useUserSession";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";

const drawerWidth = 265;

const AdminLayout = ({ children, window }) => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const { data, error } = useUserSession();

  if (!data) {
    return <LoadingSpinner show={true} />;
  }

  console.log("title", title);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header
        title={title}
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
        handleTitle={(field) => {
          setTitle(field);
        }}
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
