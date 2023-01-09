import {
  Badge,
  Box,
  ButtonBase,
  Card,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import axios from "../../api/axios";
import React, { useMemo } from "react";
import { useQuery } from "react-query";
import WithAuth from "../../HOC/WithAuth";
import queryClient from "../../query-client";
import { MoreVert, Tag } from "@mui/icons-material";
import ContentCopy from "@mui/icons-material/ContentCopy";
import AccountCard from "../../components/Dashboard/AccountCard";
import { getUserAccounts } from "../../api/accout";
import Transactions from "../../components/Dashboard/Transactions";
import AddAccountCard from "../../components/Dashboard/AddAccountCard";
import { useRouter } from "next/router";
import MenuDashboard from "../../components/Dashboard/MenuDashboard";
import Loader from "../../components/General/Loader";

const Dashboard = () => {
  const user = queryClient.getQueryData("user");
  const { push } = useRouter();
  const { isLoading, data: accounts } = useQuery("accounts", getUserAccounts, {
    refetchOnMount: true,
  });

  const totalBalance = useMemo(() => {
    if (accounts) {
      return accounts.reduce((acc, account) => acc + account.balance, 0);
    }
  }, [accounts]);

  if (isLoading) return <Loader />;
  return (
    <Box>
      <Typography
        variant="h3"
        sx={{
          padding: "1rem 0",
        }}
      >
        Welcome {user?.firstName}
      </Typography>
      <Card
        elevation={1}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 0",
          backgroundColor: "background.paper",
          borderRadius: "1rem",
          py: "2rem",
          px: "1rem",
          my: "1rem",
          mb: "2.5rem",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box>
          <Typography variant="h4" color="text.primary">
            ${totalBalance}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            TOTAL BALANCE
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
          }}
        >
          <MenuDashboard />
        </Box>
      </Card>
      <Typography variant="subtitle1" mb={2}>
        ACCOUNTS
      </Typography>
      <Grid container spacing={2}>
        {accounts?.map((account) => (
          <Grid item xs={12} sm={4} key={account._id}>
            <ButtonBase
              onClick={() => {
                push(`/account?id=${account._id}`);
              }}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "stretch",
                textAlign: "left",
              }}
            >
              <AccountCard account={account} />
            </ButtonBase>
          </Grid>
        ))}
        {accounts?.length < 6 && (
          <Grid item xs={12} sm={4}>
            <AddAccountCard />
          </Grid>
        )}
      </Grid>
      <Transactions />
    </Box>
  );
};

export default WithAuth(Dashboard);
