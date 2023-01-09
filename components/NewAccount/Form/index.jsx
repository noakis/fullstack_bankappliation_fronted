import {
  Button,
  InputLabel,
  Select,
  TextField,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useMutation } from "react-query";
import { openAccount } from "../../../api/accout";
import SnackbarContext from "../../../contex/SnackbarContext";
import queryClient from "../../../query-client";
import { FormBox } from "../../../theme/components";

const NewAccountForm = () => {
  const { showSnackbar } = useContext(SnackbarContext);
  const { push } = useRouter();
  const { mutate, isSuccess } = useMutation(
    "new-account",
    async (e) => {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);
      openAccount(data);
    },
    {
      onSuccess: (data) => {
        showSnackbar({
          message: "Account opened",
          severity: "success",
        });
        // refresh accounts query
        queryClient.invalidateQueries("accounts");
        push("/dashboard");
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(e);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          py: "1.5rem",
        }}
      >
        <FormBox>
          <InputLabel
            htmlFor="type"
            sx={{
              color: "black",
              fontWeight: "bold",
              fontSize: "0.8rem",
              color: "text.secondary",
            }}
          >
            Account Type
          </InputLabel>
          <Select native name="type" id="type">
            <option value="savings">Savings</option>
            <option value="checking">Checking</option>
          </Select>
        </FormBox>
        <FormBox>
          <InputLabel
            htmlFor="nickname"
            sx={{
              color: "black",
              fontWeight: "bold",
              fontSize: "0.8rem",
              color: "text.secondary",
            }}
          >
            Account Nickname
          </InputLabel>
          <TextField
            placeholder="Nickname"
            variant="outlined"
            size="small"
            name="nickname"
          />
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
          Open Account
        </Button>
      </Box>
    </form>
  );
};

export default NewAccountForm;
