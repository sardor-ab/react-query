import "./App.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { QueryClient, QueryClientProvider } from "react-query";
import MainContent from "./components/MainContent/index.js";
import Filter from "./components/Filter";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <CssBaseline />
        <Container maxWidth="lg">
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
        </Container>
      </div>
    </QueryClientProvider>
  );
}

export default App;
