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

const SearchUser = ({ path }) => {
  const router = useRouter();

  const keyPress = (e) => {
    if (e.key == "Enter") {
      if (e.target.value) {
        const cariNama = router.push({
          pathname: "/admin/users/guru",
          query: {
            ...router.query,
            "name[$like]": `%${e.target.value}%`,
          },
        });
        return cariNama;
      }

      return router.replace({
        pathname: "/admin/users/guru",
      });
    }
  };

  return (
    <Box>
      <TextField
        fullWidth
        sx={{ backgroundColor: "#ffff" }}
        type="search"
        id="search"
        placeholder="cari siswa"
        size="small"
        onKeyPress={keyPress}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton
                sx={{ ml: "-5px", mr: "-10px" }}
                onKeyPress={keyPress}
              >
                <FeatherIcon icon="search" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchUser;
