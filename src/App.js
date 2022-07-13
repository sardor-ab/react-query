import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import MainPage from "./pages/Main";
import PlayerPage from "./pages/Player";
import TeamPage from "./pages/Team";
import "./App.css";

// Create a client
export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <CssBaseline />
          <Container maxWidth="lg">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/player/:id" element={<PlayerPage />} />
              <Route path="/team/:id" element={<TeamPage />} />
            </Routes>
          </Container>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
