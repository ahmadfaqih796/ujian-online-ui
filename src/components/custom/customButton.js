import Button from "@mui/material/Button";
import { blue, red, yellow } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

export const CustomButtonBlue = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blue[500]),
  backgroundColor: blue[300],
  "&:hover": {
    backgroundColor: blue[700],
  },
}));

export const CustomButtonYellow = styled(Button)(({ theme }) => ({
  color: "#ffff",
  backgroundColor: yellow[700],
  "&:hover": {
    backgroundColor: yellow[800],
  },
}));

export const CustomButtonRed = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(red[500]),
  backgroundColor: red[300],
  "&:hover": {
    backgroundColor: red[700],
  },
}));
