import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, IconButton, InputLabel, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useMutation } from "react-query";
import axios from "../../../api/axios";
import SnackbarContext from "../../../contex/SnackbarContext";
import queryClient from "../../../query-client";

const FormBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const RegisterForm = () => {
  const { push } = useRouter();
  const { showSnackbar } = useContext(SnackbarContext);
  const [showPassword, setShowPassword] = React.useState(false);
  const { mutate, isLoading, isError } = useMutation(
    async (data) => {
      const register = await axios.post("/auth/register", data);

      if (register.status !== 403) {
        showSnackbar({
          message: "Account registered successfully",
          severity: "success",
        });
      } else {
        showSnackbar({
          message: "Registration failed",
          severity: "error",
        });
      }
    },
    {
      onSuccess: async (data) => {
        showSnackbar({
          message: "Registration success",
          severity: "success",
        });

        // if tokens are set in cache, redirect to home page
        // wait 4 seconds
        setTimeout(() => {
          push("/login");
        }, 2000);
      },
      onError: (error) => {
        // clear tokens from queryClient
        queryClient.removeQueries("accessToken");
        queryClient.removeQueries("refreshToken");
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    mutate(data);
  };

  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        <h1>Loading...</h1>
      </Box>
    );

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
            htmlFor="firstName"
            sx={{
              color: "black",
              fontWeight: "bold",
              fontSize: "0.8rem",
              color: "text.secondary",
            }}
          >
            First Name
          </InputLabel>
          <TextField
            placeholder="First Name"
            variant="outlined"
            size="small"
            name="firstName"
          />
        </FormBox>
        <FormBox>
          <InputLabel
            htmlFor="lastName"
            sx={{
              color: "black",
              fontWeight: "bold",
              fontSize: "0.8rem",
              color: "text.secondary",
            }}
          >
            Last Name
          </InputLabel>
          <TextField
            placeholder="Last Name"
            variant="outlined"
            size="small"
            name="lastName"
          />
        </FormBox>
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
          Sign up
        </Button>
      </Box>
    </form>
  );
};

export default RegisterForm;
