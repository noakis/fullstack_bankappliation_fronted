import {
  Box,
  Button,
  InputAdornment,
  InputLabel,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getUserAccounts } from "../../../api/accout";
import { sendTransaction } from "../../../api/transactions";
import SnackbarContext from "../../../contex/SnackbarContext";
import { FormBox } from "../../../theme/components";

const TransactionForm = () => {
  const { data: accounts } = useQuery("accounts", () => getUserAccounts());
  const queryClient = useQueryClient();
  const { showSnackbar } = useContext(SnackbarContext);
  const {
    query: { type, account },
  } = useRouter();
  const [transType, setTansType] = React.useState(type || "deposit");
  const [selectedAccount, setSelectedAccount] = React.useState(
    account || accounts?.[0]?._id || ""
  );
  // reference
  const ref = React.useRef(null);

  const { mutate } = useMutation(
    async (e) => {
      const formData = new FormData(e);
      const data = Object.fromEntries(formData);
      const transaction = await sendTransaction(data);
      // throw an error is transaction is not successful
      if (transaction?.response && transaction.response?.status === 400) {
        showSnackbar({
          message: "Insufficient Balance",
          severity: "error",
        });
        throw new Error("Insufficient Balance");
      }

      return transaction;
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries();
        await queryClient.resetQueries(["transactions", selectedAccount]);
        await queryClient.resetQueries(["transactions"]);
        await queryClient.resetQueries(["account", selectedAccount]);
        await queryClient.resetQueries({
          queryKey: "accounts",
        });
        showSnackbar({
          message: "Transaction successful",
          severity: "success",
        });
        setSelectedAccount(account || "");
        setTansType(type || "deposit");

        ref.current.reset();
      },
      onError: (error) => {
        showSnackbar({
          message: error.response.data.message,
          severity: "error",
        });
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(e.currentTarget);
  };

  const title = useMemo(() => {
    if (type === "deposit") {
      return "Deposit";
    } else if (type === "withdrawal") {
      return "Withdraw";
    } else if (type === "sent") {
      return "Transfer";
    }
  }, [type]);

  return (
    <form onSubmit={handleSubmit} ref={ref}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          py: "1.5rem",
          position: "relative",
        }}
      >
        {type ? <Typography variant="h5">{title}</Typography> : null}
        {account ? (
          <Typography
            variant="subtitle2"
            sx={{
              color: "text.secondary",
              position: "absolute",
              top: "1rem",
              right: "1rem",
            }}
          >
            Account #{account}
          </Typography>
        ) : null}
        <FormBox
          sx={{
            display: type ? "none" : "block",
          }}
        >
          <InputLabel
            htmlFor="type"
            sx={{
              color: "black",
              fontWeight: "bold",
              fontSize: "0.8rem",
              color: "text.secondary",
            }}
          >
            Transaction Type
          </InputLabel>
          <Select
            value={transType}
            native
            name="type"
            id="type"
            onChange={(e) => setTansType(e.target.value)}
          >
            {[
              {
                type: "deposit",
                label: "Deposit",
              },
              {
                type: "withdrawal",
                label: "Withdraw",
              },
              {
                type: "sent",
                label: "Transfer",
              },
            ].map((type) => (
              <option value={type.type} key={type.type}>
                {type.label}
              </option>
            ))}
          </Select>
        </FormBox>
        <FormBox
          sx={{
            display: account ? "none" : "block",
          }}
        >
          <InputLabel
            htmlFor="type"
            sx={{
              color: "black",
              fontWeight: "bold",
              fontSize: "0.8rem",
              color: "text.secondary",
            }}
          >
            Account
          </InputLabel>
          <Select
            native
            name="account"
            id="account"
            onChange={(e) => setSelectedAccount(e.target.value)}
            value={selectedAccount}
          >
            {accounts?.map((account) => (
              <option value={account._id} key={account._id}>
                {account.nickname || account._id}
              </option>
            ))}
          </Select>
        </FormBox>
        {transType === "sent" && (
          <FormBox>
            <InputLabel
              htmlFor="recipientAccount"
              sx={{
                color: "black",
                fontWeight: "bold",
                fontSize: "0.8rem",
                color: "text.secondary",
              }}
            >
              Receiving Account
            </InputLabel>
            <Select native name="recipientAccount" id="recipientAccount">
              {accounts
                ?.filter((account) => account._id !== selectedAccount)
                .map((account) => (
                  <option value={account._id} key={account._id}>
                    {account.nickname || account._id}
                  </option>
                ))}
            </Select>
          </FormBox>
        )}
        <FormBox>
          <InputLabel
            htmlFor="amount"
            sx={{
              color: "black",
              fontWeight: "bold",
              fontSize: "0.8rem",
              color: "text.secondary",
            }}
          >
            Amount
          </InputLabel>
          <TextField
            type="number"
            placeholder="example: 100"
            variant="outlined"
            size="small"
            name="amount"
            // attach dollar sign
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </FormBox>

        <Button
          type="submit"
          size="large"
          variant="contained"
          sx={{
            width: "100%",
            backgroundColor: "button.active",
            color: "primary.main",
          }}
        >
          Send Transaction
        </Button>
      </Box>
    </form>
  );
};

export default TransactionForm;
