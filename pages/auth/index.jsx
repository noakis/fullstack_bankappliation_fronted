import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useQueryClient } from "react-query";

const Auth = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  useEffect(() => {
    // grab the access token and refresh token from the url and set them in local storage and react query cache
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");
    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      queryClient.setQueryData("accessToken", accessToken);
      queryClient.setQueryData("refreshToken", refreshToken);
      // redirect to dashboard
      push("/dashboard");
    }
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h6">Loading</Typography>
    </Box>
  );
};

export default Auth;
