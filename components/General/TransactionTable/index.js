import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import {
  editAccountNumber,
  editNumberSign,
} from "../../../utils/helpers/editNumbers";

const TransactionTable = ({ transactions }) => {
  return (
    <Table size="small">
      <TableHead>
        <TableRow
          sx={{
            "& th": {
              fontWeight: "bold",
              padding: "1rem",
            },
          }}
        >
          <TableCell>Account #</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Account Balance</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Created At</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {transactions?.length === 0 || !transactions ? (
          <Box>
            <Typography variant="subtitle2" sx={{ mt: "1rem" }}>
              No transactions found
            </Typography>
          </Box>
        ) : (
          transactions?.map((transaction) => (
            <TableRow
              key={transaction._id}
              sx={{
                "& td": {
                  padding: "1rem",
                },
              }}
            >
              <TableCell>{editAccountNumber(transaction.account)}</TableCell>
              <TableCell>
                {editNumberSign(transaction.amount, transaction.type)}
              </TableCell>
              <TableCell>${transaction.balance}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>
                {moment(transaction.createdAt).format("MM/DD/YYYY hh:mm a")}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default TransactionTable;
