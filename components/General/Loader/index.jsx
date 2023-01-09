import React from "react";
import { useLottie } from "lottie-react";
import loader from "./loader.json";
import { Box } from "@mui/material";

const Loader = () => {
  const options = {
    animationData: loader,
    loop: true,
    autoplay: true,
    width: 200,
    height: 200,
  };
  const { View } = useLottie(options);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "grid",
        placeContent: "center",
        //center
        placeContent: "center",
      }}
    >
      <Box
        sx={{
          width: "200px",
          height: "200px",
        }}
      >
        {View}
      </Box>
    </Box>
  );
};

export default Loader;
