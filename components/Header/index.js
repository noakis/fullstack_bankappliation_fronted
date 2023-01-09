import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Avatar } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQueryClient } from "react-query";

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData("user");
  const { push } = useRouter();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    // cancel local storage
    await localStorage.removeItem("accessToken");
    await localStorage.removeItem("refreshToken");
    // redirect to login page
    // remove all query params
    // delete all cache
    await queryClient.removeQueries("accounts");

    await queryClient.setQueryData("accessToken", null);
    await queryClient.setQueryData("refreshToken", null);
    await queryClient.setQueryData("user", null);

    // go to login using window.location
    //after 3 seconds
    setTimeout(() => {
      window.location.href = "/login";
    }, 3000);
  };

  const AvatarMenu = React.useMemo(() => {
    return user ? (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          variant="subtitle1"
          component="div"
          sx={{ flexGrow: 1, color: "text.secondary" }}
        >
          {user.firstName} {user.lastName}
        </Typography>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <Avatar src={user?.image}>{user.firstName.slice(0, 1)}</Avatar>
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
            onClick={() => {
              push("/profile");
              handleClose();
            }}
          >
            My account
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    ) : null;
  }, [user?.firstName, anchorEl, handleLogout, push]);

  return (
    <Box sx={{ width: "100vw" }}>
      <AppBar
        elevation={0}
        position="static"
        sx={{
          backgroundColor: "background.primary",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="logo"
              style={{
                height: "80px",
              }}
            />
          </Link>
          {AvatarMenu}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
