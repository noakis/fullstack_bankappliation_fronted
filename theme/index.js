import { createTheme } from "@mui/material";

// create a theme for MUI
const theme = createTheme({
  palette: {
    primary: {
      main: "#373f51",
    },
    secondary: {
      main: "#b8e0d2",
      background: "#d6eadf",
    },
    background: {
      primary: "#F8F8F8",
      secondary: "#d6eadf",
    },
    button: {
      active: "#7CF3A0",
    },
    text: {
      primary: "#000",
      secondary: "#737173",
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { color: "primary" },
          style: {
            backgroundColor: "#7CF3A0",
            color: "#373f51",
            "&:hover": {
              backgroundColor: "#7CF3A0",
              color: "#373f51",
            },
          },
        },
        {
          props: { size: "large" },
          style: {
            padding: "12px 20px",
            fontSize: "1rem",
            borderRadius: "8px",
            color: "#737173",
          },
        },
        {
          props: { variant: "social" },
          style: {
            background: "white",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            border: "solid lightgray 1px",
            borderRadius: "50px",
            p: "10px 15px",
          },
        },
      ],

      styleOverrides: {
        root: {
          fontWeight: "bold",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            padding: "10px",
            borderRadius: "8px",
          },
        },
      },
    },
  },
});

export default theme;
