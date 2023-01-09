import { Delete, MoreVert } from "@mui/icons-material";
import { Box, ButtonBase, Pagination, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { getAccountInfo } from "../../api/accout";
import { getAccountTransactions } from "../../api/transactions";
import MenuDashboard from "../../components/Dashboard/MenuDashboard";
import NavigationHeader from "../../components/General/NavigationHeader";
import TransactionTable from "../../components/General/TransactionTable";
import { MainCard } from "../../theme/components";
import axios from "../../api/axios";

const Account = () => {
  const [page, setPage] = React.useState(1);
  const queryClient = useQueryClient();

  const {
    query: { id },
    push,
  } = useRouter();
  const { data: dataTransactions } = useQuery(
    ["transactions", id, page],
    () => getAccountTransactions(id),
    {
      enabled: !!id,
    }
  );
  const { data } = useQuery(["account", id], () => getAccountInfo(id), {
    enabled: !!id,
  });

  const handleDelete = async () => {
    await axios.delete(`/accounts/${id}`);
    queryClient.invalidateQueries("accounts");
    push("/dashboard");
  };

  return (
    <Box>
      <NavigationHeader title="Dashboard" link="/dashboard" />
      <MainCard
        elevation={1}
        sx={{
          justifyContent: "space-between",
          alignItems: "flex-start",
          my: "1rem",
          mb: "2.5rem",
          minHeight: "10rem",
        }}
      >
        <Box>
          <Typography variant="h6" color="text.primary" mb={4}>
            {data?.account?.nickname}
          </Typography>
          <Typography variant="h4" color="text.primary">
            ${data?.account?.balance}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            TOTAL BALANCE
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <MenuDashboard account={id} />
        </Box>
      </MainCard>
      <MainCard
        sx={{
          flexDirection: "column",
        }}
      >
        <TransactionTable transactions={dataTransactions?.transactions} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: "1rem",
          }}
        >
          <Pagination
            count={dataTransactions?.totalPages}
            page={page}
            onChange={(e, page) => setPage(page)}
          />
        </Box>
      </MainCard>
      {data?.account?.balance < 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: "3rem",
            color: "text.secondary",
            fontSize: "0.8rem",
            fontWeight: "900",
          }}
        >
          <ButtonBase
            sx={{ display: "flex", justifyContent: "center" }}
            onClick={handleDelete}
          >
            <Delete /> Delete Account
          </ButtonBase>
        </Box>
      )}
    </Box>
  );
};

export default Account;
