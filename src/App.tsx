import { useEffect, useLayoutEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { settings } from "@gravity-ui/date-utils";
import { configure } from "@gravity-ui/uikit";
import { Lang, ThemeProvider } from "@gravity-ui/uikit";
import "@gravity-ui/uikit/styles/fonts.css";
import "@gravity-ui/uikit/styles/styles.css";

import { useActions } from "./hooks/useActions";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { useAuth } from "./hooks/useAuth";

import { RequireAuth } from "./hoc/RequireAuth";

import { Home } from "./pages/Home/Home";
import { SignIn } from "./pages/SignIn/SignIn";

import styles from "./App.module.sass";

import "./utils/i18n.js";

function App() {
  const { i18n } = useTranslation();
  const { getCountries, getCities, refreshToken } = useActions();
  const navigate = useNavigate();
  const isAuthGlobal = useAuth();
  const isAuth = useTypedSelector((state) => state.adminReducer.isAuth);
  const isRefreshed = useTypedSelector(
    (state) => state.adminReducer.isRefreshed,
  );
  const countries = useTypedSelector((state) => state.coreReducer.countries);
  const cities = useTypedSelector((state) => state.coreReducer.cities);

  useLayoutEffect(() => {
    if (!Array.isArray(countries) || countries.length === 0) {
      getCountries();
    }
    if (!Array.isArray(cities) || cities.length === 0) {
      getCities();
    }
  }, []);

  useEffect(() => {
    if (isAuth && !isRefreshed) {
      refreshToken();
    }
  }, [isAuth, isRefreshed]);

  useEffect(() => {
    if (isAuthGlobal) {
      navigate("/");
    }
  }, [isAuthGlobal]);

  useEffect(() => {
    configure({ lang: i18n.resolvedLanguage as Lang });
    settings.setLocale(i18n.resolvedLanguage!);
  }, [i18n.resolvedLanguage]);

  return (
    <ThemeProvider theme="light">
      <section className={styles.wrapper}>
        <Routes>
          <Route path="/sign_in" element={<SignIn />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="*"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
        </Routes>
      </section>
    </ThemeProvider>
  );
}

export default App;
