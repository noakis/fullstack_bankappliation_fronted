import { Box, Card } from "@mui/material";
import { styled } from "@mui/system";

export const FormBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

export const MainCard = styled(Card)({
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  width: "100%",
  padding: "1.5rem",
  borderRadius: "1rem",
  display: "flex",
  overflow: "auto",
});
