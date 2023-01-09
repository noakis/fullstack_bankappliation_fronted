import { ContentCopy } from "@mui/icons-material";
import { Badge, Box, Card, IconButton, Typography } from "@mui/material";
import React from "react";
import useAccountIcon from "../../../hooks/useAccountIcon";
import {
  editAccountNumber,
  formatBalance,
} from "../../../utils/helpers/editNumbers";

const AccountCard = ({ account }) => {
  const accountIcon = useAccountIcon(account.type);
  return (
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
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <Badge
        color={
          account.type === "savings"
            ? "success"
            : account.type === "credit"
            ? "secondary"
            : "primary"
        }
        badgeContent={account.type}
        sx={{
          position: "absolute",
          top: "1.5rem",
          right: "2.5rem",
        }}
      ></Badge>
      <Box>
        <Typography
          variant="h6"
          color="text.primary"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          {accountIcon} {account.nickname}
        </Typography>
      </Box>
      <Box>
        <Typography variant="h5">${formatBalance(account.balance)}</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {editAccountNumber(account._id)}
          <IconButton size="small">
            <ContentCopy fontSize="10px" />
          </IconButton>
        </Typography>
      </Box>
    </Card>
  );
};

export default AccountCard;
