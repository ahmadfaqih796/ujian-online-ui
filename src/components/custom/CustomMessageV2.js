import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import React from "react";

const ACCORDION_WIDTH = 180;

const CustomMessageV2 = () => {
  const handleClick = () => {};
  return (
    <React.Fragment>
      <Accordion
        sx={{
          width: "300px",
          position: "fixed",
          zIndex: 1,
          right: 20,
          bottom: 0,
          "&.Mui-expanded": {
            margin: "0",
          },
          "@media (max-width:600px)": {
            display: "none",
          },
        }}
      >
        <AccordionSummary
          expandIcon={
            <Box
              sx={{
                zIndex: 99,
                "&:hover": {
                  backgroundColor: "#f0f0f0", // Warna latar belakang yang berubah saat hover
                },
              }}
              onClick={console.log("masuk")}
            >
              <FeatherIcon icon="chevron-up" />
            </Box>
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Pesan</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
          <Button onClick={handleClick}>Coba</Button>
        </AccordionDetails>
      </Accordion>
      {/* <Accordion
        sx={{
          width: "300px",
          position: "fixed",
          right: 2 * ACCORDION_WIDTH,
          bottom: 0,
          "@media (max-width:600px)": {
            display: "none",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<FeatherIcon icon="chevron-up" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Faqih</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
    </React.Fragment>
  );
};

export default CustomMessageV2;
