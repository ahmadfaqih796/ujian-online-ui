export const stringAvatar = (name, size) => {
  return {
    sx: {
      bgcolor: "gray",
      width: size,
      height: size,
    },
    children: `${name
      .split(" ")
      .map((n) => n[0])
      .join("")}`,
  };
};
