import { BrowserRouter, Routes, Route } from "react-router-dom";
import Videos from "./pages/Videos";
import AppLayout from "./ui/AppLayout";
// import GlobalStyles from "./services/GlobalStyles";
import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createContext, useState } from "react";

// Create a client
const queryClient = new QueryClient();
const VideosContext = createContext();

function App() {
  const [filterArtists, setFilterArtists] = useState([]);

  return (
    <>
      {/* <GlobalStyles /> */}
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <AppLayout
                  filterArtists={filterArtists}
                  setFilterArtists={setFilterArtists}
                />
              }
            >
              <Route
                path="/"
                element={
                  // <VideosContext.Provider
                  //   value={{ filterArtists, setFilterArtists }}
                  // >
                  <Videos
                    filterArtists={filterArtists}
                    setFilterArtists={setFilterArtists}
                  />
                  // </VideosContext.Provider>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>

        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        {/* </VideosContext.Provider> */}
      </QueryClientProvider>
    </>
  );
}

export default App;
