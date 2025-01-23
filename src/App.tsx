import { useLayoutEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { useActions } from "./hooks/useActions";

import { Home } from "./pages/Home/Home";
import { SignIn } from "./pages/SignIn/SignIn";

import styles from "./App.module.sass";
import { useTypedSelector } from "./hooks/useTypedSelector";

function App() {
  const { getCountries, getCities } = useActions();
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

  return (
    <section className={styles.wrapper}>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </section>
  );
}

export default App;
