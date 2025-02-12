import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Await, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { settings } from "@gravity-ui/date-utils";

import App from "./App";

import { store } from "./store/store";

import "./utils/i18n.js";

const container = document.getElementById("root");
const root = createRoot(container!);

async function initData() {
  await settings.loadLocale("ru");
}

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback="...loading">
        <Await resolve={initData} children={<App />} />
      </Suspense>
    </Provider>
  </BrowserRouter>,
);
