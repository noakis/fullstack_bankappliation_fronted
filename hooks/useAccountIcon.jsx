// hook to determine the icon to use for the account
import { AccountBalance, CreditCard, Savings } from "@mui/icons-material";
import { useMemo } from "react";

export default function useAccountIcon(accountType) {
  return useMemo(() => {
    switch (accountType) {
      case "savings":
        return <Savings />;
      case "checking":
        return <AccountBalance />;
      case "credit":
        return <CreditCard />;
      default:
        return <AccountBalance />;
    }
  }, [accountType]);
}
