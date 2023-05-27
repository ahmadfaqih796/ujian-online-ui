import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";

import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { useUserSession } from "@/hooks/auth/useUserSession";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import { Container, experimentalStyled } from "@mui/material";

const drawerWidth = 265;

const MainWrapper = experimentalStyled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  overflow: "hidden",
  width: "100%",
}));

const PageWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",

  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up("lg")]: {
    paddingTop: "64px",
  },
  [theme.breakpoints.down("lg")]: {
    paddingTop: "64px",
  },
}));

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const { data, error } = useUserSession();

  if (!data) {
    return <LoadingSpinner show={true} />;
  }
  if (error) {
    return "kapan lagi";
  }

  return (
    <MainWrapper>
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
        handleTitle={(field) => setTitle(field)}
      />
      <PageWrapper>
        <Container maxWidth={false}>
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default AdminLayout;
