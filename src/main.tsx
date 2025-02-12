import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Await, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { settings } from "@gravity-ui/date-utils";

import App from "./App";

import { store } from "./store/store";

import "../src/utils/i18n.js";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback="...loading">
        <Await resolve={settings.loadLocale("ru")} children={<App />} />
      </Suspense>
    </Provider>
  </BrowserRouter>,
);
