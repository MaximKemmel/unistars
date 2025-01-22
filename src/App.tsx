import {useEffect, useLayoutEffect} from "react";
import { Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { settings } from '@gravity-ui/date-utils';
import {configure, ThemeProvider} from '@gravity-ui/uikit';
import { Lang } from '@gravity-ui/uikit';

import { useActions } from "./hooks/useActions";

import { Home } from "./pages/Home/Home";
import { SignIn } from "./pages/SignIn/SignIn";

import styles from "./App.module.sass";
import { useTypedSelector } from "./hooks/useTypedSelector";

await settings.loadLocale('ru');

function App() {
  const { i18n } = useTranslation();
  const { getCountries, getCities } = useActions();
  const countries = useTypedSelector((state) => state.coreReducer.countries);
  const cities = useTypedSelector((state) => state.coreReducer.cities);

  useLayoutEffect(() => {
    if (i18n.resolvedLanguage != null) {
      settings.setLocale(i18n.resolvedLanguage);
      configure({ lang: i18n.resolvedLanguage as Lang });
    }
    if (!Array.isArray(countries) || countries.length === 0) {
      getCountries();
    }
    if (!Array.isArray(cities) || cities.length === 0) {
      getCities();
    }
  }, []);

  useEffect(() => {
    if (i18n.resolvedLanguage != null) {
      settings.setLocale(i18n.resolvedLanguage);
      configure({ lang: i18n.resolvedLanguage as Lang });
    }
  }, [i18n.resolvedLanguage]);

  return (
    <ThemeProvider theme="light">
      <section className={styles.wrapper}>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </section>
    </ThemeProvider>
  );
}

export default App;
