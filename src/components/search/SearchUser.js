import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import FeatherIcon from "feather-icons-react";
import { useRouter } from "next/router";
import React from "react";

const SearchUser = ({ path, placeholder }) => {
  const router = useRouter();
  const [icon, setIcon] = React.useState("");
  console.log("xxxxx", icon);

  const keyPress = (e) => {
    console.log("sssss", e);
    if (e.key == "Enter" || e.type === "click") {
      if (e.target.value) {
        const searchName = router.push({
          pathname: "/admin/users/guru",
          query: {
            ...router.query,
            "name[$like]": `%${e.target.value}%`,
          },
        });
        return searchName;
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
        value={icon}
        onChange={(e) => setIcon(e.target.value)}
        InputProps={
          !icon
            ? {
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      sx={{ ml: "-10px", mr: "-20px" }}
                      onClick={keyPress}
                    >
                      <FeatherIcon icon="search" />
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Box>
  );
};

export default SearchUser;
