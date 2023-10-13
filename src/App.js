import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Videos from "./pages/Videos";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
// import GlobalStyles from "./services/GlobalStyles";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { createContext, useState } from "react";

// Create a client
const queryClient = new QueryClient();
// const VideosContext = createContext();

function App() {
  const [filterArtists, setFilterArtists] = useState([]);
  const [filterDifficulty, setFilterDifficulty] = useState([]);

  return (
    <>
      {/* <GlobalStyles /> */}
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <Routes>
            <Route
              element={
                <AppLayout
                  filterArtists={filterArtists}
                  setFilterArtists={setFilterArtists}
                  filterDifficulty={filterDifficulty}
                  setFilterDifficulty={setFilterDifficulty}
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
                    filterDifficulty={filterDifficulty}
                    setfilterDifficulty={setFilterDifficulty}
                  />
                  // </VideosContext.Provider>
                }
              />
            </Route>
          </Routes>
        </HashRouter>

        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        {/* </VideosContext.Provider> */}
      </QueryClientProvider>
    </>
  );
}

export default App;
