import { SnackbarProvider } from "notistack";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SnackbarUtilitiesConfigurator } from "@/utilities/";
import "./App.scss";

import Home from "./views/Home";
import DefaultLayout from "./layouts/DefaultLayout";
import Details from "./views/Details";

function App() {
  return (
    <SnackbarProvider
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <SnackbarUtilitiesConfigurator />
      <DefaultLayout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon/:id" element={<Details />} />
          </Routes>
        </BrowserRouter>
      </DefaultLayout>
    </SnackbarProvider>
  );
}

export default App;
