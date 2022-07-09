import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Filter from "../../components/Filter/index";
import MainContent from "../../components/MainContent/index";

const MainPage = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <MainContent />
        </Grid>
        <Grid item xs={4}>
          <Filter />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainPage;
