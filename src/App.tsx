import { useLayoutEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { useActions } from "./hooks/useActions";
import { useTypedSelector } from "./hooks/useTypedSelector";

import { RequireAuth } from "./hoc/RequireAuth";

import { Home } from "./pages/Home/Home";
import { SignIn } from "./pages/SignIn/SignIn";

import styles from "./App.module.sass";

function App() {
  const { authMe, getCountries, getCities } = useActions();
  const countries = useTypedSelector((state) => state.coreReducer.countries);
  const cities = useTypedSelector((state) => state.coreReducer.cities);

  useLayoutEffect(() => {
    authMe();
    if (!Array.isArray(countries) || countries.length === 0) {
      getCountries();
    }
    if (!Array.isArray(cities) || cities.length === 0) {
      getCities();
    }
  }, []);

  return (
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
  );
}

export default App;
