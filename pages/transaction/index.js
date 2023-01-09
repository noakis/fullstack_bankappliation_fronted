import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import NaviagtionHeader from "../../components/General/NavigationHeader";
import TransactionForm from "../../components/Transaction/Form";
import { MainCard } from "../../theme/components";

const Transaction = () => {
  const {
    query: { type, account },
  } = useRouter();
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <NaviagtionHeader
        title={account ? "Account" : "Dashboard"}
        link={account ? `/account?id=${account}` : "/dashboard"}
      />

      <MainCard
        sx={{
          maxWidth: "500px",
          width: "100%",
          mt: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <TransactionForm />
      </MainCard>
    </Box>
  );
};

export default Transaction;
