import React from "react";
import { Slide } from "@mui/material";

const Transition = (direction) =>
  React.forwardRef((props, ref) => (
    <Slide direction={direction} ref={ref} {...props} />
  ));

export default Transition;
