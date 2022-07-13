import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Filter from "../../components/Filter/";
import MainContent from "../../components/MainContent/";

const MainPage = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item md={8} sm={12}>
          <MainContent />
        </Grid>
        <Grid item md={4} sm={0}>
          <Filter />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainPage;
