import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

export const CustomButtonRed = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(red[500]),
  backgroundColor: red[300],
  "&:hover": {
    backgroundColor: red[700],
  },
}));
