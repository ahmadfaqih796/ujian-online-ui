import React from "react";
import FeatherIcon from "feather-icons-react";
import { Button, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";

const ThreeDotsMenu = (props) => {
  const { data, onClickDetail, onClickEdit, onClickDelete } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-haspopup="true"
        onClick={handleClick}
        aria-label="action"
        size="large"
      >
        <FeatherIcon icon="more-horizontal" />
      </IconButton>
      <Menu
        id="card-actions-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            onClickDetail?.();
          }}
        >
          Detail
        </MenuItem>
        <MenuItem
          onClick={() => {
            onClickEdit?.();
          }}
        >
          Ubah
        </MenuItem>
        <MenuItem
          onClick={() => {
            onClickDelete?.();
          }}
        >
          Hapus
        </MenuItem>
      </Menu>
    </>
  );
};

export default ThreeDotsMenu;
