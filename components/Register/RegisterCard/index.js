import { Card, Typography, Box, Button } from "@mui/material";
import Image from "next/image";
import React from "react";
import { API_URL } from "../../../utils/constants/env";
import RegisterForm from "../Form";

const RegisterCard = () => {
  return (
    <Card
      elevation={5}
      sx={{
        display: "grid",
        placeItems: "center",
        gap: 4,
        py: 8,
        px: 8,
        backgroundColor: "white",
        borderRadius: 4,
        maxWidth: "500px",
        width: "100%",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "50px",
        }}
      >
        <Image src="/logo.png" alt="logo" layout="fill" objectFit="cover" />
      </Box>
      <Typography variant="h5" fontWeight="bold" color="text.secondary">
        Register
      </Typography>
      <RegisterForm />
      <Typography variant="body2" color="text.secondary" align="center">
        - OR -
      </Typography>
      <Button component="a" href={API_URL + "/auth/google"} variant="social">
        {" "}
        <Image src="/google.png" width={15} height={15} alt="google-icon" />
        Sign Up with Google{" "}
      </Button>
    </Card>
  );
};

export default RegisterCard;
