import { SnackbarProvider } from "notistack";
import { SnackbarUtilitiesConfigurator } from "@/utilities/";
import "./App.scss";

import Home from "./views/Home";

function App() {
  return (
    <SnackbarProvider
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <SnackbarUtilitiesConfigurator />

      <div className="mx-auto max-w-3xl px-5 mb-5 flex flex-col gap-10">
        <main className="flex flex-col gap-16 py-8">
          <Home />
        </main>
      </div>
    </SnackbarProvider>
  );
}

export default App;
