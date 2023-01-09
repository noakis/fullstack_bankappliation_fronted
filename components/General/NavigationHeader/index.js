import { ArrowBackIos } from "@mui/icons-material";
import { Box, ButtonBase } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const NaviagtionHeader = ({ title, link }) => {
  const { push } = useRouter();
  return (
    <Box
      sx={{
        width: "100%",
        py: "1rem",
      }}
    >
      <ButtonBase
        onClick={() => push(link)}
        sx={{
          color: "text.secondary",
          fontSize: "1rem",
        }}
      >
        <ArrowBackIos /> {title}
      </ButtonBase>
    </Box>
  );
};

export default NaviagtionHeader;
