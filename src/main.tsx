import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";

import { store } from "./store/store";

import "../src/utils/i18n.js";
import { settings } from "@gravity-ui/date-utils";

const container = document.getElementById("root");
const root = createRoot(container!);
await settings.loadLocale("ru");

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback="...loading">
        <App />
      </Suspense>
    </Provider>
  </BrowserRouter>,
);
