import { AddCard } from "@mui/icons-material";
import { Box, Card, Typography } from "@mui/material";
import React from "react";
import NaviagtionHeader from "../../components/General/NavigationHeader";
import Form from "../../components/NewAccount/Form";

const NewAccount = () => {
  return (
    <>
      <NaviagtionHeader link={"/dashboard"} title="Dashboard" />

      <Box
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Card
          sx={{
            padding: "1.5rem",
            borderRadius: "1rem",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            maxWidth: "500px",
            width: "100%",
            mt: "5rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              color: "text.secondary",
            }}
          >
            <AddCard />

            <Typography variant="h6">OPEN ACCOUNT</Typography>
          </Box>
          <Form />
        </Card>
      </Box>
    </>
  );
};

export default NewAccount;
