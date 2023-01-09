import { ThemeProvider } from "@mui/material";
import Layout from "../components/layout";
import "../styles/globals.css";
import theme from "../theme";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import queryClient from "../query-client";
import SnackbarProvider from "../contex/SnackbarContext/provider";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [showing, setShowing] = useState(false);

  useEffect(() => {
    setShowing(true);
  }, []);

  if (!showing) {
    return null;
  }
  // prevent window is not defined error
  if (typeof window === "undefined") return null;
  if (typeof localStorage === "undefined") return null;

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
