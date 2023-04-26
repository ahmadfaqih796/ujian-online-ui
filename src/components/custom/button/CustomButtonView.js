import Button from "@mui/material/Button";
import { blue } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

export const CustomButtonView = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blue[500]),
  backgroundColor: blue[500],
  "&:hover": {
    backgroundColor: blue[700],
  },
}));
