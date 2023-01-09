import { AddCard } from "@mui/icons-material";
import { ButtonBase, Card, Typography, Box } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const AddAccountCard = () => {
  const { push } = useRouter();
  return (
    <ButtonBase
      onClick={() => push("/new-account")}
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "stretch",
        textAlign: "left",
      }}
    >
      <Card
        elevation={1}
        sx={{
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          width: "100%",
          padding: "1.5rem",
          position: "relative",
          minHeight: "10rem",
          borderRadius: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",

          alignItems: "center",
          backgroundColor: "transparent",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <AddCard />
          <Typography variant="h6" color="text.primary">
            Add Account
          </Typography>
        </Box>
      </Card>
    </ButtonBase>
  );
};

export default AddAccountCard;
