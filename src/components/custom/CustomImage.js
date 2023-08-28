import React from "react";
import Image from "next/image";
import { Avatar } from "@mui/material";
import { stringAvatar } from "@/layouts/header/stringAvatar";

const CustomImage = ({ alt, src, margin }) => {
  return (
    <React.Fragment>
      {src ? (
        <Image
          alt={alt || "no_image"}
          src={`http://localhost:3030/uploads/${src}`}
          width="40"
          height="40"
          priority={true}
          style={{
            objectFit: "contain",
            border: "2px solid gray",
            borderRadius: "50%",
            marginLeft: margin || "16px",
            marginTop: margin || "16px",
          }}
        />
      ) : (
        <Avatar {...stringAvatar(alt || "hallo", "40px")} />
      )}
    </React.Fragment>
  );
};

export default CustomImage;
