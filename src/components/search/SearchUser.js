import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import FeatherIcon from "feather-icons-react";
import React from "react";

const SearchUser = () => {
  const router = useRouter();

  const formRef = React.useRef(null);

  const handleResetFilter = () => {
    formRef.current.reset();
    router.replace({
      shallow: true,
    });
  };
  return (
    <Box>
      <form ref={formRef}>
        <TextField
          fullWidth
          sx={{ backgroundColor: "#ffff" }}
          type="search"
          id="search"
          placeholder="cari siswa"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton sx={{ ml: "-5px", mr: "-10px" }}>
                  <FeatherIcon icon="search" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </Box>
  );
};

export default SearchUser;
