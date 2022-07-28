import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import MainPage from "./pages/Main";
import "./App.css";

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <MainPage />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
