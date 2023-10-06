import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
// import Header from "./ui/Header";
import Videos from "./pages/Videos";
import AppLayout from "./ui/AppLayout";
import GlobalStyles from "./services/GlobalStyles";

function App() {
  return (
    <>
      {/* <GlobalStyles /> */}
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Videos />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
