import { ArrowBackIos } from "@mui/icons-material";
import { Box, ButtonBase, Pagination, Typography } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { getUserTransactions } from "../../api/transactions";
import NaviagtionHeader from "../../components/General/NavigationHeader";
import TransactionTable from "../../components/General/TransactionTable";
import { MainCard } from "../../theme/components";

const Transactions = () => {
  const [page, setPage] = React.useState(1);
  const { data } = useQuery(["transactions", page], () =>
    getUserTransactions(page)
  );
  return (
    <Box>
      <NaviagtionHeader title="Dashboard" link="/" />
      <Typography variant="h6" my={2}>
        Transactions
      </Typography>
      <MainCard
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TransactionTable transactions={data?.transactions} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: "1rem",
          }}
        >
          <Pagination
            size="large"
            count={data?.totalPages}
            page={page}
            onChange={(e, page) => setPage(page)}
          />
        </Box>
      </MainCard>
    </Box>
  );
};

export default Transactions;
