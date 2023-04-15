import React from "react";

export function useSnackbar() {
  const [isActive, setIsActive] = React.useState(false);
  const [message, setMessage] = React.useState();

  const openSnackBar = (msg = "Something went wrong...") => {
    setMessage(msg);
    setIsActive(true);
  };

  const closeSnackBar = () => {
    setIsActive(false);
  };

  return { isActive, message, openSnackBar, closeSnackBar };
}
