import { BrowserRouter, Routes, Route } from "react-router-dom";
import Videos from "./pages/Videos";
import AppLayout from "./ui/AppLayout";
// import GlobalStyles from "./services/GlobalStyles";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <>
      {/* <GlobalStyles /> */}
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Videos />} />
            </Route>
          </Routes>
        </BrowserRouter>

        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </>
  );
}

export default App;
