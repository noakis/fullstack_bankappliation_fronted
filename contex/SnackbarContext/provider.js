// snackbar context provider

import { Alert, Snackbar } from "@mui/material";
import React, { useState } from "react";

import SnackbarContext from "./index";

const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const showSnackbar = ({ message, severity }) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const hideSnackbar = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider
      value={{
        open,
        message,
        severity,
        showSnackbar,
        hideSnackbar,
      }}
    >
      {children}
      <Snackbar
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
        open={open}
        autoHideDuration={3000}
        onClose={hideSnackbar}
      >
        <Alert
          onClose={hideSnackbar}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
