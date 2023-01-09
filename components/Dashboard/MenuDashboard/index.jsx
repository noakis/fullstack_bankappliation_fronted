import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";

const MenuDashboard = ({ account }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { push } = useRouter();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (link) => {
    setAnchorEl(null);
    push(link);
  };
  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() =>
            handleClose(
              `/transaction?type=deposit` +
                (account ? `&account=${account}` : "")
            )
          }
        >
          Deposit Amount
        </MenuItem>
        <MenuItem
          onClick={() =>
            handleClose(
              "/transaction?type=withdrawal" +
                (account ? `&account=${account}` : "")
            )
          }
        >
          Withdraw Amount
        </MenuItem>
        <MenuItem
          onClick={() =>
            handleClose(
              "/transaction?type=sent" + (account ? `&account=${account}` : "")
            )
          }
        >
          Transfer Amount
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuDashboard;
