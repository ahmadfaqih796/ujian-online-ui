import {
  Box,
  Button,
  Container,
  experimentalStyled,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Customizer from "./customizer/Customizer";
import CustomizerReducer from "./customizer/CustomizerReducer";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
// import { useSelector } from "react-redux";
// import Sidebar from "./sidebar/Sidebar";

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
  // const customizer = useSelector(CustomizerReducer);
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  return (
    <MainWrapper>
      <Header
        // data={data}
        sx={{
          paddingLeft: isSidebarOpen ? "265px" : "",
          // backgroundColor:
          //   customizer.activeMode === "dark" ? "#20232a" : "#fafbfb",
          backgroundColor: "#fafbfb",
        }}
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        toggleMobileSidebar={() => setMobileSidebarOpen(true)}
      />
      <Sidebar
        // data={data}
        // isSidebardir={customizer.activeDir === "ltr" ? "left" : "right"}
        isSidebardir={"left"}
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      <PageWrapper>
        <Container
          maxWidth={false}
          sx={{
            paddingTop: "20px",
            paddingLeft: isSidebarOpen ? "280px!important" : "",
          }}
        >
          <Button onClick={() => setSidebarOpen(!isSidebarOpen)}>aaa</Button>
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
          {/* <Customizer /> */}
          {/* <Footer /> */}
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default AdminLayout;
