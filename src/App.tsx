import { SnackbarProvider } from "notistack";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { SnackbarUtilitiesConfigurator } from "@/utilities/";
import "./App.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Home from "./views/Home";
import DefaultLayout from "./layouts/DefaultLayout";
import Details from "./views/Details";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <SnackbarUtilitiesConfigurator />
        <DefaultLayout>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pokemon/:id" element={<Details />} />
              <Route path="*" element={<Navigate to={"/"} />} />
            </Routes>
          </BrowserRouter>
        </DefaultLayout>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
