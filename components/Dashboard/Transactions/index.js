import {
  Box,
  Card,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import { useQuery } from "react-query";
import { getUserTransactions } from "../../../api/transactions";
import { editAccountNumber } from "../../../utils/helpers/editNumbers";
import TransactionTable from "../../General/TransactionTable";

const Transactions = () => {
  const { data } = useQuery("transactions", () => getUserTransactions(1));

  return (
    <Box
      sx={{
        mt: "2rem",
      }}
    >
      <Typography variant="subtitle1">TRANSACTIONS</Typography>
      <Card
        elevation={1}
        sx={{
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          width: "100%",
          padding: "1.5rem",
          minHeight: "10rem",
          borderRadius: "1rem",
          display: "flex",
          flexDirection: "column",
          mt: "1rem",
          overflow: "scroll",
        }}
      >
        <TransactionTable transactions={data?.transactions?.slice(0, 5)} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="subtitle2" sx={{ mt: "1rem" }}>
            {data?.transactions?.length} transactions found
          </Typography>
          {data?.transactions?.length > 5 && (
            <Link href="/transactions">
              <Typography variant="subtitle2" sx={{ mt: "1rem" }}>
                View all
              </Typography>
            </Link>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default Transactions;
