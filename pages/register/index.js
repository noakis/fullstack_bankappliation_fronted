import { Box, Typography } from "@mui/material";
import React from "react";
import NaviagtionHeader from "../../components/General/NavigationHeader";
import RegisterCard from "../../components/Register/RegisterCard";

const Register = () => {
  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        minHeight: "80vh",
      }}
    >
      <NaviagtionHeader link={"/login"} />
      <RegisterCard />
      <Box sx={{ mt: "2rem" }}>
        <Typography variant="body2" color="text.secondary" align="center">
          Already have an account?{" "}
          <Typography
            variant="body2"
            color="primary"
            component="a"
            href="/login"
          >
            Login
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;
