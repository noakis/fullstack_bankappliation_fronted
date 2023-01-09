import { Box } from "@mui/material";
import { Container } from "@mui/system";
import { useRouter } from "next/router";
import React from "react";
import { useQueryClient } from "react-query";
import Header from "../Header";

const blackList = ["/login", "/register"];

const Layout = (props) => {
  const { pathname, push } = useRouter();

  return (
    <Box
      sx={{
        backgroundColor: "background.primary",
        minHeight: "100vh",
        height: "fit-content",
        height: "100%",
        py: 2,
      }}
    >
      {blackList.includes(pathname) ? null : <Header />}
      <Container
        maxWidth="lg"
        sx={{
          py: 3,
          minHeight: "calc(100vh - 80px)",
        }}
      >
        {props.children}
      </Container>
    </Box>
  );
};

export default Layout;
