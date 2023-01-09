import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, IconButton, InputLabel, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "../../../api/axios";
import Loader from "../../General/Loader";
import _axios from "axios";
import SnackbarContext from "../../../contex/SnackbarContext";

const FormBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const LoginForm = () => {
  const { showSnackbar } = useContext(SnackbarContext);

  const { push } = useRouter();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = React.useState(false);
  const { mutate, isLoading, isError } = useMutation(
    async (data) => {
      return await axios.post("/auth/login", data);
    },
    {
      onSuccess: async (data) => {
        const { data: dataUser } = await _axios.get(
          process.env.NEXT_PUBLIC_API_URL + "/auth/me",
          {
            headers: {
              Authorization: `Bearer ${data.data.accessToken}`,
            },
          }
        );
        // set tokens in cache
        // set tokens in local storage

        await localStorage.setItem("accessToken", data.data.accessToken);
        await localStorage.setItem("refreshToken", data.data.refreshToken);
        await queryClient.setQueryData("accessToken", data.data.accessToken);
        await queryClient.setQueryData("refreshToken", data.data.refreshToken);
        if (dataUser?.user) {
          await queryClient.setQueryData("user", dataUser?.user);
          showSnackbar({
            message: "Login success",
            severity: "success",
          });
        }

        // if tokens are set in cache, redirect to home page
        if (queryClient.getQueryData("accessToken")) {
          // wait 4 seconds
          push("/dashboard");
        }
      },
      onError: (error) => {
        // clear tokens from queryClient
        queryClient.removeQueries("accessToken");
        queryClient.removeQueries("refreshToken");
        // clear user from queryClient
        // delete toeke from local storage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    mutate(data);
  };

  if (isLoading) return <Loader />;

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          width: "100%",
          gap: 2,
        }}
      >
        <FormBox>
          <InputLabel
            htmlFor="email"
            sx={{
              color: "black",
              fontWeight: "bold",
              fontSize: "0.8rem",
              color: "text.secondary",
            }}
          >
            Email
          </InputLabel>
          <TextField
            placeholder="Email"
            variant="outlined"
            size="small"
            name="email"
          />
        </FormBox>
        <FormBox>
          <InputLabel
            sx={{
              color: "black",
              fontWeight: "bold",
              fontSize: "0.8rem",
              color: "text.secondary",
            }}
            htmlFor="password"
          >
            Password
          </InputLabel>
          <TextField
            name="password"
            placeholder="Password"
            variant="outlined"
            size="small"
            // add icon to show password
            type={showPassword ? "text" : "password"}
            // add icon to show password
            InputProps={{
              endAdornment: (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  backgroundColor="transparent"
                  sx={{
                    mr: 1,
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />{" "}
        </FormBox>
        <Button
          type="submit"
          size="large"
          variant="contained"
          sx={{
            width: "100%",
            backgroundColor: "button.active",
            color: "primary.main",
          }}
        >
          Login
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;
