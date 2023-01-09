import { Box, Typography } from "@mui/material";
import React from "react";
import { MainCard } from "../../theme/components";
import Form from "../../components/EditProfile/Form";
import NaviagtionHeader from "../../components/General/NavigationHeader";

const EditProfile = () => {
  return (
    <Box>
      <NaviagtionHeader title="Profile" link="/profile" />
      <MainCard sx={{ maxWidth: "600px", width: "100%", mx: "auto" }}>
        <Form />
      </MainCard>
    </Box>
  );
};

export default EditProfile;
