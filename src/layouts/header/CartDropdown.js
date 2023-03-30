import React, { useState } from "react";
import PropTypes from "prop-types";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import {
  Box,
  Typography,
  Avatar,
  Button,
  ButtonGroup,
  Divider,
  Dialog,
  DialogTitle,
  IconButton,
  Drawer,
} from "@mui/material";

import * as data from "./data";

function SimpleDialog(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose(true);
  };

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open} fullWidth>
      <DialogTitle id="simple-dialog-title">
        <Box
          sx={{
            display: {
              xs: "block",
              sm: "flex",
              lg: "flex",
            },
            alignItems: "center",
            color: "success.main",
          }}
        >
          <FeatherIcon icon="shopping-cart" width="20" height="20" />
          <Typography
            variant="h4"
            sx={{
              ml: 2,
            }}
          >
            Order Successfully Done
          </Typography>
          <Box
            sx={{
              ml: "auto",
            }}
          >
            <Button color="error" onClick={handleClose} autoFocus>
              Close
            </Button>
          </Box>
        </Box>
      </DialogTitle>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

const CartDropdown = () => {
  // increment & decrement
  const [count, setCount] = useState(0);

  const Increase = () => {
    setCount(count + 1);
  };

  const Decrease = () => {
    setCount(count - 1);
  };

  // dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // drawer
  const [showDrawer, setShowDrawer] = useState(false);

  const handleDrawerClose = () => {
    setShowDrawer(false);
  };
  return (
    <>
      <IconButton
        size="large"
        color="inherit"
        onClick={() => setShowDrawer(true)}
      >
        <FeatherIcon icon="shopping-cart" width="20" height="20" />
      </IconButton>
      <Drawer
        anchor="right"
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: {
              xs: "100%",
              sm: "395px",
            },
            padding: "30px",
          },
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography variant="h4" fontWeight="500">
            Shopping Cart
          </Typography>
          <Box
            sx={{
              ml: "auto",
            }}
          >
            <IconButton
              color="inherit"
              sx={{
                color: (theme) => theme.palette.grey.A200,
              }}
              onClick={handleDrawerClose}
            >
              <FeatherIcon icon="x-circle" />
            </IconButton>
          </Box>
        </Box>
        {/* component */}
        <Box>
          <Box>
            {data.products.map((product) => (
              <Box key={product.name}>
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    pb: 4,
                    pt: 3,
                  }}
                >
                  <Image
                    src={product.imgsrc}
                    alt={product.imgsrc}
                    height="70px"
                    width="90px"
                  />
                  <Box
                    sx={{
                      ml: 2,
                    }}
                  >
                    <Typography variant="h5">{product.name}</Typography>
                    <Typography color="textSecondary" variant="h6">
                      {product.subtext}
                    </Typography>
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{
                        mt: 1,
                      }}
                    >
                      <Typography variant="h5">${product.price}</Typography>
                      <Box
                        sx={{
                          ml: 1,
                        }}
                      >
                        <ButtonGroup
                          size="small"
                          color="success"
                          aria-label="small button group"
                        >
                          <Button
                            onClick={Decrease}
                            sx={{
                              width: "35px",
                              height: "35px",
                              padding: "5px",
                            }}
                          >
                            <FeatherIcon icon="minus" width="18" height="18" />
                          </Button>
                          <Button
                            sx={{
                              width: "35px",
                              height: "35px",
                              padding: "5px",
                            }}
                          >
                            {count}
                          </Button>
                          <Button
                            onClick={Increase}
                            sx={{
                              width: "35px",
                              height: "35px",
                              padding: "5px",
                            }}
                          >
                            <FeatherIcon icon="plus" width="18" height="18" />
                          </Button>
                        </ButtonGroup>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Divider />
              </Box>
            ))}
          </Box>

          <Box
            display="flex"
            alignItems="center"
            sx={{
              mt: 2,
            }}
          >
            <Typography color="textSecondary" variant="h6" fontWeight="400">
              Sub Total
            </Typography>
            <Box
              sx={{
                ml: "auto",
              }}
            >
              <Typography variant="h6">$890</Typography>
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              mt: 2,
            }}
          >
            <Typography color="textSecondary" variant="h6" fontWeight="400">
              Total
            </Typography>
            <Box
              sx={{
                ml: "auto",
              }}
            >
              <Typography variant="h6">$890</Typography>
            </Box>
          </Box>
          <Button
            sx={{
              mt: 2,
              display: "block",
              width: "100%",
            }}
            variant="contained"
            color="primary"
            onClick={handleClickOpen}
          >
            Place order
          </Button>
          <SimpleDialog open={open} onClose={handleClose} />
        </Box>
      </Drawer>
    </>
  );
};

export default CartDropdown;
