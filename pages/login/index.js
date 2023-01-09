import { Box, Typography } from "@mui/material";
import React from "react";
import LoginForm from "../../components/Login/Form";
import LoginCard from "../../components/Login/LoginCard";

const Login = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    window.location.href = "/dashboard";
  }

  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        // backgroundColor: "#e2ebe1",
        minHeight: "80vh",
      }}
    >
      <LoginCard />
      <Box sx={{ mt: "2rem" }}>
        <Typography variant="body2" color="text.secondary" align="center">
          Do not have an account?{" "}
          <Typography
            variant="body2"
            color="primary"
            component="a"
            href="/register"
          >
            Register
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
