import { Box, Container, experimentalStyled } from "@mui/material";
import React from "react";

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
  return (
    <>
      <p>ini adalah admin</p>
      {/* <PageWrapper>
        <Container
          maxWidth={false}
          sx={{
            paddingTop: "20px",
            paddingLeft: isSidebarOpen && lgUp ? "280px!important" : "",
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
          <Customizer />
          <Footer />
        </Container>
      </PageWrapper> */}
      <Box sx={{ color: "red" }}>{children}</Box>
    </>
  );
};

export default AdminLayout;
